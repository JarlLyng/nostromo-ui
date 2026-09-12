import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Table, TableColumn } from "../table";

// Sample data for testing
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 28,
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 32,
    department: "Marketing",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 45,
    department: "Sales",
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
  { key: "department", title: "Department", dataIndex: "department" },
];

describe("Table", () => {
  it("renders table with data", () => {
    render(<Table data={sampleData} columns={columns} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(<Table data={sampleData} columns={columns} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Department")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<Table data={[]} columns={columns} loading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<Table data={[]} columns={columns} emptyText="No data found" />);

    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <Table data={sampleData} columns={columns} variant="striped" />,
    );
    expect(screen.getByRole("table")).toHaveClass("border", "border-border");

    rerender(<Table data={sampleData} columns={columns} variant="bordered" />);
    const table = screen.getByRole("table");
    expect(table).toHaveClass("border-2", "border-border");
    // "bordered" should not have the thin border
    expect(table).not.toHaveClass("border", "border-border");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(
      <Table data={sampleData} columns={columns} size="sm" />,
    );
    expect(screen.getByRole("table")).toHaveClass("text-xs", "sm:text-sm");

    rerender(<Table data={sampleData} columns={columns} size="lg" />);
    expect(screen.getByRole("table")).toHaveClass("text-base", "sm:text-lg");
  });

  it("handles row click", () => {
    const onRowClick = vi.fn();
    render(
      <Table data={sampleData} columns={columns} onRowClick={onRowClick} />,
    );

    fireEvent.click(screen.getByText("John Doe").closest("tr")!);
    expect(onRowClick).toHaveBeenCalledWith(sampleData[0], 0);
  });

  it("handles sorting", () => {
    const onSort = vi.fn();
    render(<Table data={sampleData} columns={columns} onSort={onSort} />);

    const sortButton = screen.getByLabelText("Sort by Name");
    fireEvent.click(sortButton);

    expect(onSort).toHaveBeenCalledWith(columns[0], "asc");
  });

  it("handles selection", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange,
        }}
      />,
    );

    const checkbox = screen.getAllByRole("checkbox")[1]; // First data row checkbox
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith([1], [sampleData[0]]);
  });

  it("handles select all", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange,
        }}
      />,
    );

    const selectAllCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(selectAllCheckbox);

    expect(onChange).toHaveBeenCalledWith([1, 2, 3], sampleData);
  });

  it("renders pagination", () => {
    render(
      <Table
        data={sampleData}
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 3,
          onChange: vi.fn(),
        }}
      />,
    );

    expect(screen.getByText("Showing 1 to 2 of 3 results")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });

  it("handles pagination change", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={sampleData}
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 3,
          onChange,
        }}
      />,
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(onChange).toHaveBeenCalledWith(2, 2);
  });

  it("renders custom cell content", () => {
    const customColumns: TableColumn[] = [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        render: (value) => <strong>{value}</strong>,
      },
    ];

    render(<Table data={sampleData} columns={customColumns} />);

    expect(screen.getByText("John Doe").closest("strong")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Table data={sampleData} columns={columns} className="custom-table" />,
    );

    expect(screen.getByRole("table")).toHaveClass("custom-table");
  });

  it("handles disabled selection", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange,
          getCheckboxProps: (record) => ({
            disabled: record.id === 1,
          }),
        }}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[1]).toBeDisabled(); // First data row should be disabled
    expect(checkboxes[2]).not.toBeDisabled(); // Second data row should be enabled
  });

  it("shows indeterminate state for select all", () => {
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [1],
          onChange: vi.fn(),
        }}
      />,
    );

    const selectAllCheckbox = screen.getAllByRole(
      "checkbox",
    )[0] as HTMLInputElement;
    expect(selectAllCheckbox.indeterminate).toBe(true);
  });

  it("renders with different row keys", () => {
    const customData = [
      { customId: "a", name: "John" },
      { customId: "b", name: "Jane" },
    ];

    render(
      <Table
        data={customData}
        columns={[{ key: "name", title: "Name", dataIndex: "name" }]}
        rowKey="customId"
      />,
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("renders with function row key", () => {
    render(
      <Table
        data={sampleData}
        columns={columns}
        rowKey={(record) => `row-${record.id}`}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});

/**
 * Selection, after the 2026-09-12 audit (#239).
 *
 * Three defects, all of which the suite above passed straight through: a record
 * with `id: 0` reported a different record's key, select-all read the length of
 * the whole selection against the number of visible rows, and it replaced the
 * selection rather than adding this page to it.
 */
describe("Table selection", () => {
  const page = [
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
  ];
  const cols: TableColumn[] = [
    { key: "name", title: "Name", dataIndex: "name" },
  ];

  const selectAll = () => screen.getByLabelText("Select all rows");
  const rowBox = (n: number) => screen.getByLabelText(`Select row ${n}`);

  // `record[rowKey] || index` treated id 0 as missing and used the position
  // instead, so this row announced itself as key 1 - which belongs to another
  // record entirely.
  it("keeps a zero key instead of falling back to the index", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={[
          { id: 7, name: "Seven" },
          { id: 0, name: "Zero" },
        ]}
        columns={cols}
        selection={{ selectedRowKeys: [], onChange }}
      />,
    );

    fireEvent.click(rowBox(2));
    expect(onChange).toHaveBeenCalledWith([0], [{ id: 0, name: "Zero" }]);
  });

  // Two rows visible, two rows selected somewhere else. Comparing the two
  // lengths said "all selected".
  it("ignores selected keys that are not on this page", () => {
    render(
      <Table
        data={page}
        columns={cols}
        selection={{ selectedRowKeys: [8, 9], onChange: vi.fn() }}
      />,
    );

    expect(selectAll()).not.toBeChecked();
    expect((selectAll() as HTMLInputElement).indeterminate).toBe(false);
  });

  it("adds this page to the selection rather than replacing it", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={page}
        columns={cols}
        selection={{ selectedRowKeys: [8, 9], onChange }}
      />,
    );

    fireEvent.click(selectAll());
    const [keys] = onChange.mock.calls[0]!;
    expect(keys).toEqual(expect.arrayContaining([8, 9, 1, 2]));
    expect(keys).toHaveLength(4);
  });

  it("removes only this page when unselecting all", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={page}
        columns={cols}
        selection={{ selectedRowKeys: [8, 9, 1, 2], onChange }}
      />,
    );

    expect(selectAll()).toBeChecked();
    fireEvent.click(selectAll());
    expect(onChange).toHaveBeenCalledWith([8, 9], []);
  });

  it("is indeterminate when some of this page is selected", () => {
    render(
      <Table
        data={page}
        columns={cols}
        selection={{ selectedRowKeys: [1], onChange: vi.fn() }}
      />,
    );

    expect(selectAll()).not.toBeChecked();
    expect((selectAll() as HTMLInputElement).indeterminate).toBe(true);
  });

  describe("with a disabled row", () => {
    const disableTwo = {
      getCheckboxProps: (record: { id: number }) => ({
        disabled: record.id === 2,
      }),
    };

    it("leaves it out of select-all", () => {
      const onChange = vi.fn();
      render(
        <Table
          data={page}
          columns={cols}
          selection={{ selectedRowKeys: [], onChange, ...disableTwo }}
        />,
      );

      fireEvent.click(selectAll());
      expect(onChange).toHaveBeenCalledWith([1], [{ id: 1, name: "One" }]);
    });

    // Every row that *can* be selected is, so the box is checked. Counting the
    // disabled row would have left it permanently indeterminate.
    it("counts as selected-all once every selectable row is selected", () => {
      render(
        <Table
          data={page}
          columns={cols}
          selection={{ selectedRowKeys: [1], onChange: vi.fn(), ...disableTwo }}
        />,
      );

      expect(selectAll()).toBeChecked();
      expect((selectAll() as HTMLInputElement).indeterminate).toBe(false);
    });

    it("does not select it from its own checkbox either", () => {
      const onChange = vi.fn();
      render(
        <Table
          data={page}
          columns={cols}
          selection={{ selectedRowKeys: [], onChange, ...disableTwo }}
        />,
      );

      expect(rowBox(2)).toBeDisabled();
      fireEvent.click(rowBox(2));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // The keys are the whole selection; the records are only what this page can
  // resolve. Documented on the prop, and pinned here so it stays deliberate.
  it("reports every key but only the records it has", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={page}
        columns={cols}
        selection={{ selectedRowKeys: [9], onChange }}
      />,
    );

    fireEvent.click(rowBox(1));
    const [keys, records] = onChange.mock.calls[0]!;
    expect(keys).toEqual([9, 1]);
    expect(records).toEqual([{ id: 1, name: "One" }]);
  });

  it("does not add a key twice", () => {
    const onChange = vi.fn();
    render(
      <Table
        data={page}
        columns={cols}
        selection={{ selectedRowKeys: [1], onChange }}
      />,
    );

    // Already selected, and the checkbox reflects that.
    expect(rowBox(1)).toBeChecked();
    fireEvent.click(rowBox(1));
    expect(onChange).toHaveBeenCalledWith([], []);
  });
});
