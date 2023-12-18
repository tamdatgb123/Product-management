import React from "react";
import Button from "../../../../Components/Button";

const UserTab = ({data, onDelete}) => {
  const [userList, setUserList] = React.useState([]);

  React.useEffect(() => {
    const list = data.user.filter(user => user.role === "user");
    setUserList(list);
  }, [])

  return (
    <>
    <div className="p-8">
      {userList && userList.map((user, index) =>
        <div key={index} className="w-full border border-gray-300 shadow p-4 mt-4">
          <div className="flex justify-between items-center">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>
                <Button onClick={() => onDelete(user.id)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default UserTab;
