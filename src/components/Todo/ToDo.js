import {
  faFilePen
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { Form } from 'react-bootstrap';
import { useAuthState } from "react-firebase-hooks/auth";
import toast from 'react-hot-toast';
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../firebase.init";
import './ToDo.css';



const Todo = () => {

  const [authUser] = useAuthState(auth);


  const [todo, setTodo] = React.useState({
    taskWriter: authUser?.displayName,
    taskWriterEmail: authUser?.email,
    taskDescription: '',
    taskCompleted : false
    
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    console.log(todo);
     if(authUser){
       axiosPrivate
         .post("https://arcane-escarpment-31102.herokuapp.com/task", todo, {
           headers: {
             email: authUser?.email,
           },
         })
         .then((response) => {
           console.log(response);
           const { status } = response;
           if (status === 200) {
             toast.success("Task Added Successfully");
             e.target.reset();
           } else {
             toast.error("Task Not Added");
           }
         });
     }
      else{
        toast.error("Please Login First");
        e.target.reset();
      }
  }


    return (
      <div className>
        <h1 className="text-center text-primary ">
          Write Your ToDo List Below!
        </h1>
        <div className="w-50 mx-auto">
          <Form onSubmit={handleAddTask}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={authUser?.email}
                required
                disabled={authUser?.email ? true : false}
                type="email"
                placeholder="Your Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                disabled={authUser?.displayName ? true : false}
                value={authUser?.displayName}
                type="text"
                required
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                onChange={(e) => setTodo({ ...todo, taskName: e.target.value })}
                name="taskName"
                required
                type="text"
                placeholder="Shopping for Christmas"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setTodo({ ...todo, taskDescription: e.target.value })
                }
                name="taskDescription"
                required
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <button type="submit" className="btn btn-success d-block mx-auto">
              Add To Task List{" "}
              <FontAwesomeIcon className="ms-2" icon={faFilePen} />
            </button>
          </Form>
        </div>
      </div>
    );
};

export default Todo;