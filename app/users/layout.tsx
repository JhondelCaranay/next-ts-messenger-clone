import Sidebar from "../components/sidebar/Sidebar";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  // const users = await getUsers();

  return (
    /* @ts-expect-error Async Server Component */
    <Sidebar>
      <div className="h-full">
        {/* <UserList items={users} /> */}
        {children}
      </div>
    </Sidebar>
  );
}
