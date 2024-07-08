import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectAllUsers } from "../../../../slices/auth";

const TotalOrganizers = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const organizers = users.filter((user) => user.role === "Organizer");

  return (
    <div>
      <h1>Total Organizers</h1>
      <table className="table">
        <thead className="thead-light bg-body-tertiary">
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        {organizers.map((user) => (
          <>
            <tbody>
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </>
        ))}
      </table>
    </div>
  );
};

export default TotalOrganizers;
