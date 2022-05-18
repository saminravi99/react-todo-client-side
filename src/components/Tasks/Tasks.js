import {
  faHeart, faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../firebase.init";

const Tasks = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [authUser] = useAuthState(auth);
  const [reload, setReload] = React.useState(false);

  useEffect(() => {
    axiosPrivate
      .get(`https://arcane-escarpment-31102.herokuapp.com/tasks/${authUser?.email}`, {
        headers: {
          email: authUser.email,
        },
      })
      .then((response) => {
        console.log(response);
        const { data } = response;
        setTodoList(data);
      });
  }, [authUser?.email, reload]);

  console.log(todoList);

  const handleCompleted = (id) => {
    axiosPrivate
      .put(
        `https://arcane-escarpment-31102.herokuapp.com/task/${id}`,
        {
          ...todoList.find((task) => task.id === id),
          taskCompleted: true,
        },
        {
          headers: {
            email: authUser.email,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const { status } = response;
        if (status === 200) {
          setReload(!reload);
          toast.success("Task Completed Successfully");
        }
      });
  };

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (proceed) {
      axiosPrivate
        .delete(`https://arcane-escarpment-31102.herokuapp.com/task/${id}`, {
          headers: {
            email: authUser.email,
          },
        })
        .then((response) => {
          console.log(response);
          const { status } = response;
          if (status === 200) {
            setReload(!reload);
            toast.success("Task Deleted Successfully");
          }
        });
    }
  };

  const todo = todoList.map((item, index) => {
    return (
      <Card key={item._id} className="my-5 p-5">
        <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center">
          <div>
            <h3 className="text-muted">
              <span>{index + 1}. </span>
              {item.taskCompleted ? (
                <del>{item.taskName}</del>
              ) : (
                <span>{item.taskName}</span>
              )}
            </h3>
            <h4>
              <i>"{item.taskDescription}"</i>
            </h4>
          </div>
          <div className="mt-lg-0 mt-3">
            <button
              disabled={item.taskCompleted ? true : false}
              className="btn btn-success me-5"
              onClick={() => {
                handleCompleted(item._id);
              }}
            >
              Complete
              <FontAwesomeIcon className="ms-2" icon={faHeart} />
            </button>
            <button
              onClick={() => {
                handleDelete(item._id);
              }}
              className="btn btn-danger"
            >
              Delete
              <FontAwesomeIcon className="ms-2" icon={faTrash} />
            </button>
          </div>
        </div>
      </Card>
    );
  });

  return (
    <div className="padding-nav">
      <h1 className="text-center text-success">Your To Do List</h1>
      <div className="container">{todo}</div>
    </div>
  );
};

export default Tasks;
