import React from "react";
import { useUserListQuery } from "../../redux/api/auth";

const RegistrationList = () => {
  const { data } = useUserListQuery();
  console.log(data, "data");
  return (
    <div className="container mt-5">
      <h1 className="text-dark mb-4">Registration List</h1>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.username}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationList;
