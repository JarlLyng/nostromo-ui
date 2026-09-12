import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { DataTable, TableColumn, ColumnFilter } from "../data-table";

// Sample data for testing
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 28,
    department: "Engineering",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 32,
    department: "Marketing",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 45,
    department: "Sales",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    age: 29,
    department: "Engineering",
    status: "Active",
  },
];

const columns: TableColumn[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  {
    key: "age",
    title: "Age",
    dataIndex: "age",
    sortable: true,
    align: "center",
  },
  {
    key: "department",
    title: "Department",
    dataIndex: "department",
    sortable: true,
  },
  { key: "status", title: "Status", dataIndex: "status" },
];

describe("DataTable", () => {
  it("renders table with data", () => {
    render(<DataTable data={sampleData} columns={columns} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("renders search input when searchable is true", () => {
    render(<DataTable data={sampleData} columns={columns} searchable={true} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  it("filters data by search term", async () => {
    render(<DataTable data={sampleData} columns={columns} searchable={true} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "John" } });

    await waitFor(
      () => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("searches across multiple columns", async () => {
    render(<DataTable data={sampleData} columns={columns} searchable={true} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Engineering" } });

    await waitFor(
      () => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Alice Brown")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("applies column filters", async () => {
    const filters: ColumnFilter[] = [
      {
        key: "department",
        type: "select",
        options: [
          { label: "Engineering", value: "Engineering" },
          { label: "Marketing", value: "Marketing" },
          { label: "Sales", value: "Sales" },
        ],
      },
    ];

    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterable={true}
        filters={filters}
      />,
    );

    const filterSelect = screen.getByLabelText("Filter by department");
    fireEvent.change(filterSelect, { target: { value: "Engineering" } });

    await waitFor(
      () => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Alice Brown")).toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("sorts data when column header is clicked", async () => {
    render(<DataTable data={sampleData} columns={columns} />);

    const nameHeader = screen.getByText("Name").closest("th");
    const sortButton = nameHeader?.querySelector("button");

    if (sortButton) {
      fireEvent.click(sortButton);

      await waitFor(
        () => {
          const rows = screen.getAllByRole("row");
          // First data row should be sorted
          expect(rows[1]).toHaveTextContent("Alice Brown");
        },
        { timeout: 5000 },
      );
    }
  });

  it("paginates data correctly", async () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        defaultPageSize={2}
        showPagination={true}
      />,
    );

    // Should show first 2 items
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("Bob Johnson")).not.toBeInTheDocument();

    // Click next page
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);

    await waitFor(
      () => {
        expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
        expect(screen.getByText("Alice Brown")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("calls onSearch callback when search term changes", async () => {
    const onSearch = vi.fn();

    render(
      <DataTable
        data={sampleData}
        columns={columns}
        searchable={true}
        onSearch={onSearch}
      />,
    );

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "John" } });

    await waitFor(
      () => {
        expect(onSearch).toHaveBeenCalledWith("John", expect.any(Array));
      },
      { timeout: 5000 },
    );
  });

  it("calls onFilter callback when filter changes", async () => {
    const onFilter = vi.fn();
    const filters: ColumnFilter[] = [
      {
        key: "status",
        type: "select",
        options: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ],
      },
    ];

    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterable={true}
        filters={filters}
        onFilter={onFilter}
      />,
    );

    const filterSelect = screen.getByLabelText("Filter by status");
    fireEvent.change(filterSelect, { target: { value: "Active" } });

    await waitFor(
      () => {
        expect(onFilter).toHaveBeenCalledWith(
          { status: "Active" },
          expect.any(Array),
        );
      },
      { timeout: 5000 },
    );
  });

  it("hides search bar when showSearch is false", () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        searchable={true}
        showSearch={false}
      />,
    );

    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  it("hides filters when showFilters is false", () => {
    const filters: ColumnFilter[] = [
      {
        key: "department",
        type: "select",
        options: [{ label: "Engineering", value: "Engineering" }],
      },
    ];

    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterable={true}
        filters={filters}
        showFilters={false}
      />,
    );

    expect(
      screen.queryByLabelText("Filter by department"),
    ).not.toBeInTheDocument();
  });

  it("shows results summary", () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        showPagination={true}
        defaultPageSize={10}
      />,
    );

    // Check for results summary text (may appear multiple times)
    const summaries = screen.getAllByText(/Showing 1 to 4 of 4 results/);
    expect(summaries.length).toBeGreaterThan(0);
  });

  it("resets to first page when search changes", async () => {
    render(
      <DataTable
        data={sampleData}
        columns={columns}
        searchable={true}
        defaultPageSize={2}
        showPagination={true}
      />,
    );

    // Go to page 2
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);

    await waitFor(
      () => {
        expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Search should reset to page 1
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "John" } });

    await waitFor(
      () => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        // Should be on page 1
        expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("clears filters when clear button is clicked", async () => {
    const filters: ColumnFilter[] = [
      {
        key: "department",
        type: "select",
        options: [
          { label: "Engineering", value: "Engineering" },
          { label: "Marketing", value: "Marketing" },
        ],
      },
    ];

    render(
      <DataTable
        data={sampleData}
        columns={columns}
        filterable={true}
        filters={filters}
      />,
    );

    // Apply filter
    const filterSelect = screen.getByLabelText("Filter by department");
    fireEvent.change(filterSelect, { target: { value: "Engineering" } });

    await waitFor(
      () => {
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Clear filters
    const clearButton = screen.getByText("Clear filters");
    fireEvent.click(clearButton);

    await waitFor(
      () => {
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
});

/**
 * The three DataTable findings of the 2026-09-12 audit: #236 controlled sorting
 * firing twice with the wrong values, #237 server-supplied rows being processed
 * again locally, and #238 boolean and numeric filters that could not represent
 * false, zero or empty.
 *
 * All three passed straight through the 21 tests above.
 */

const twoColumns: TableColumn[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];
const twoRows = [
  { id: 1, name: "Ripley", age: 30 },
  { id: 2, name: "Dallas", age: 40 },
];

describe("DataTable controlled sorting", () => {
  // Clicking Age emitted ("age", "desc") and then ("name", "asc"): two requests,
  // the second putting the old column back.
  it("emits one change carrying both new values", () => {
    const onSortChange = vi.fn();
    render(
      <DataTable
        data={twoRows}
        columns={twoColumns}
        sortColumn="name"
        sortDirection="desc"
        onSortChange={onSortChange}
      />,
    );

    fireEvent.click(screen.getByLabelText("Sort by Age"));

    expect(onSortChange).toHaveBeenCalledTimes(1);
    expect(onSortChange).toHaveBeenCalledWith("age", "asc");
  });

  it("toggles direction on the column already sorted", () => {
    const onSortChange = vi.fn();
    render(
      <DataTable
        data={twoRows}
        columns={twoColumns}
        sortColumn="name"
        sortDirection="asc"
        onSortChange={onSortChange}
      />,
    );

    fireEvent.click(screen.getByLabelText("Sort by Name"));
    expect(onSortChange).toHaveBeenCalledTimes(1);
    expect(onSortChange).toHaveBeenCalledWith("name", "desc");
  });

  // The controlled setter guarded on an existing column and direction, so a
  // table that started unsorted never emitted anything at all.
  it("works for a table that starts unsorted", () => {
    const onSortChange = vi.fn();
    render(
      <DataTable
        data={twoRows}
        columns={twoColumns}
        sortColumn=""
        onSortChange={onSortChange}
      />,
    );

    fireEvent.click(screen.getByLabelText("Sort by Age"));
    expect(onSortChange).toHaveBeenCalledTimes(1);
    expect(onSortChange).toHaveBeenCalledWith("age", "asc");
  });

  // The consumer the documentation shows: one that writes both values back.
  it("lands where a stateful consumer expects", () => {
    const seen: Array<[string, string]> = [];
    const Consumer = () => {
      const [column, setColumn] = React.useState("name");
      const [direction, setDirection] = React.useState<"asc" | "desc">("desc");
      return (
        <DataTable
          data={twoRows}
          columns={twoColumns}
          sortColumn={column}
          sortDirection={direction}
          onSortChange={(c, d) => {
            seen.push([c, d]);
            setColumn(c);
            setDirection(d);
          }}
        />
      );
    };
    render(<Consumer />);

    fireEvent.click(screen.getByLabelText("Sort by Age"));
    expect(seen).toEqual([["age", "asc"]]);

    fireEvent.click(screen.getByLabelText("Sort by Age"));
    expect(seen).toEqual([
      ["age", "asc"],
      ["age", "desc"],
    ]);
  });

  it("still sorts by itself when uncontrolled", () => {
    render(<DataTable data={twoRows} columns={twoColumns} />);
    fireEvent.click(screen.getByLabelText("Sort by Age"));

    const cells = screen.getAllByRole("cell").map((cell) => cell.textContent);
    expect(cells.indexOf("30")).toBeLessThan(cells.indexOf("40"));
  });
});

describe("DataTable manual processing", () => {
  // A server searching without accent distinctions returns this row for "jose".
  // The local substring filter then threw it away, while totalItems still
  // counted it.
  it("keeps server rows that a local search would drop", () => {
    render(
      <DataTable
        data={[{ id: 1, name: "José", age: 30 }]}
        columns={twoColumns}
        manualSearch
        searchTerm="jose"
        onSearchTermChange={vi.fn()}
        currentPage={1}
        totalItems={1}
      />,
    );

    expect(screen.getByText("José")).toBeInTheDocument();
  });

  it("keeps the server's order", () => {
    render(
      <DataTable
        data={twoRows}
        columns={twoColumns}
        manualSorting
        sortColumn="age"
        sortDirection="desc"
        onSortChange={vi.fn()}
      />,
    );

    // Ripley is 30 and Dallas is 40, so sorting this page by age descending
    // locally would swap them. The server sent them in this order, and that is
    // the order that survives. An ascending sort would have agreed with the
    // given order by coincidence and proved nothing.
    const cells = screen.getAllByRole("cell").map((cell) => cell.textContent);
    expect(cells.indexOf("Ripley")).toBeLessThan(cells.indexOf("Dallas"));
  });

  it("keeps server rows that a local filter would drop", () => {
    const filters: ColumnFilter[] = [
      { key: "name", label: "Name", type: "text" },
    ];
    render(
      <DataTable
        data={[{ id: 1, name: "José", age: 30 }]}
        columns={twoColumns}
        filterable
        filters={filters}
        manualFiltering
        columnFilters={{ name: "jose" }}
        onColumnFiltersChange={vi.fn()}
      />,
    );

    expect(screen.getByText("José")).toBeInTheDocument();
  });

  // Manual means "you do the work", not "you get no events".
  it("still reports what the user asked for", () => {
    const onSearchTermChange = vi.fn();
    render(
      <DataTable
        data={twoRows}
        columns={twoColumns}
        manualSearch
        searchTerm=""
        onSearchTermChange={onSearchTermChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Search table"), {
      target: { value: "rip" },
    });
    expect(onSearchTermChange).toHaveBeenCalledWith("rip");
  });

  // Controlled state on its own must not decide who processes: a controlled
  // search that is not manual still filters locally, which is what client-side
  // consumers rely on.
  it("does not turn controlled into manual by itself", () => {
    render(
      <DataTable
        data={twoRows}
        columns={twoColumns}
        searchTerm="ripley"
        onSearchTermChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Ripley")).toBeInTheDocument();
    expect(screen.queryByText("Dallas")).not.toBeInTheDocument();
  });
});

describe("DataTable filter values", () => {
  const crew = [
    { id: 1, name: "Ripley", active: true, score: 0 },
    { id: 2, name: "Dallas", active: false, score: 7 },
  ];
  const crewColumns: TableColumn[] = [
    { key: "name", title: "Name", dataIndex: "name" },
    { key: "score", title: "Score", dataIndex: "score" },
  ];

  const booleanFilter: ColumnFilter[] = [
    { key: "active", label: "Active", type: "boolean" },
  ];
  const numberFilter: ColumnFilter[] = [
    { key: "score", label: "Score", type: "number" },
  ];

  // It used to be a text input, and `Boolean("false")` is true - so asking for
  // the inactive records returned exactly the active ones.
  it("gives a boolean filter three states", () => {
    render(
      <DataTable
        data={crew}
        columns={crewColumns}
        filterable
        filters={booleanFilter}
      />,
    );

    const select = screen.getByLabelText("Filter by active");
    expect(select.tagName).toBe("SELECT");
    expect(
      Array.from(select.querySelectorAll("option")).map((o) => o.value),
    ).toEqual(["", "true", "false"]);
  });

  it("selects the false records when asked for false", () => {
    render(
      <DataTable
        data={crew}
        columns={crewColumns}
        filterable
        filters={booleanFilter}
      />,
    );

    fireEvent.change(screen.getByLabelText("Filter by active"), {
      target: { value: "false" },
    });

    expect(screen.getByText("Dallas")).toBeInTheDocument();
    expect(screen.queryByText("Ripley")).not.toBeInTheDocument();
  });

  it("shows a controlled false rather than a blank box", () => {
    render(
      <DataTable
        data={crew}
        columns={crewColumns}
        filterable
        filters={booleanFilter}
        columnFilters={{ active: false }}
        onColumnFiltersChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Filter by active")).toHaveValue("false");
  });

  // `Number("")` is 0, so an emptied box used to leave only the zero-valued rows.
  it("treats an emptied number filter as no filter", () => {
    render(
      <DataTable
        data={crew}
        columns={crewColumns}
        filterable
        filters={numberFilter}
      />,
    );
    const input = screen.getByLabelText("Filter by score");

    fireEvent.change(input, { target: { value: "7" } });
    expect(screen.queryByText("Ripley")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "" } });
    expect(screen.getByText("Ripley")).toBeInTheDocument();
    expect(screen.getByText("Dallas")).toBeInTheDocument();
  });

  it("keeps an explicitly entered zero", () => {
    render(
      <DataTable
        data={crew}
        columns={crewColumns}
        filterable
        filters={numberFilter}
      />,
    );

    fireEvent.change(screen.getByLabelText("Filter by score"), {
      target: { value: "0" },
    });

    expect(screen.getByText("Ripley")).toBeInTheDocument();
    expect(screen.queryByText("Dallas")).not.toBeInTheDocument();
  });

  it("shows a controlled zero rather than a blank box", () => {
    render(
      <DataTable
        data={crew}
        columns={crewColumns}
        filterable
        filters={numberFilter}
        columnFilters={{ score: 0 }}
        onColumnFiltersChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Filter by score")).toHaveValue(0);
  });
});
