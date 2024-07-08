import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectAllUsers } from "../../../../slices/auth";

const TotalAttendees = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const attendees = users.filter((user) => user.role === "Attendee");
  return (
    <div>
      <h1>Total Attendees</h1>
      <table className="table">
        <thead className="thead-light bg-body-tertiary">
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        {attendees.map((user) => (
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

export default TotalAttendees;
