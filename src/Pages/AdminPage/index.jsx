import React from "react";
import AdminNavbar from "../../Components/Navbar/Components/adminNavbar";
import Navbar from "./components/Navbar";
import OrderTab from "./components/OrderTab";
import UserTab from "./components/UserTab";
import { useData } from "../../provider/defaultProvider/dataContext";
import Button from "../../Components/Button";

const AdminPage = () => {
  const { data } = useData();
  const [renderPage, setRenderPage] = React.useState("order");
  const [renderConfirmDelete, setRenderConfirmDelete] = React.useState(false);
  const [idUserSelected, setIdUserSelected] = React.useState("");

  const handleSelectUser = (id) => {
    setIdUserSelected(id);
    setRenderConfirmDelete(true);
  };

  const handleDeleteUser = () => {
    const updateDataUser = data.user.filter(
      (user) => user.id !== idUserSelected
    );
    console.log(updateDataUser);
    setRenderConfirmDelete(false);
  };

  const Tabs = [
    {
      name: "order",
      content: <OrderTab data={data} />,
    },
    {
      name: "user",
      content: <UserTab data={data} onDelete={handleSelectUser} />,
    },
  ];

  return (
    <>
      <div className="w-full sticky top-0">
        <AdminNavbar />
      </div>
      <div className="flex">
        <Navbar renderPage={renderPage} setRenderPage={setRenderPage} />
        <div className="w-full ml-60">
          {Tabs.map((tab, index) => (
            <div key={index}>{tab.name == renderPage && tab.content}</div>
          ))}
        </div>
      </div>
      {renderConfirmDelete ? (
        <div className="absolute w-screen h-screen top-0">
          <div className="absolute w-full h-full top-0 bg-gray-500 opacity-50 z-0"></div>
          <div className="absolute w-full h-full top-0 z-10">
            <div className="flex w-full h-full justify-center items-center">
              <div className="bg-white p-8">
                <div className="text-center text-3xl font-medium">
                  Are you sure delete this user?
                </div>
                <div className="flex justify-center gap-8">
                  <Button onClick={handleDeleteUser}>Yes</Button>
                  <Button onClick={() => setRenderConfirmDelete(false)}>
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AdminPage;
