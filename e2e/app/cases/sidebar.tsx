import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@jarllyng/nostromo";

/**
 * `defaultOpen` is read from the cookie here, which is what the docs tell a
 * server to do. That makes the cookie's whole purpose testable: collapse, reload,
 * and see whether it comes back collapsed.
 */
function cookieDefaultOpen(): boolean {
  return !document.cookie.includes("sidebar_state=false");
}

export function SidebarCase() {
  return (
    <SidebarProvider defaultOpen={cookieDefaultOpen()}>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="px-4 py-3 font-semibold">Acme</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {["Home", "Inbox", "Settings"].map((item) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuButton isActive={item === "Home"}>
                    <span>{item}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <SidebarTrigger />
          <span className="text-sm font-medium">Page</span>
        </div>
        <p className="p-4 text-sm text-muted-foreground">Page content</p>
      </SidebarInset>
    </SidebarProvider>
  );
}
