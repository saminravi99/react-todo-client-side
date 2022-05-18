import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../firebase.init";
import useBooks from "../hooks/useBooks";
import "./AddItems.css";



const AddItems = () => {
const [books] = useBooks();

  //React Firebase Hook
  const [authUser] = useAuthState(auth);

  //Declaring React  States
  const [addBook, setAddBook] = useState({
    bookName: "",
    author: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });


  const [userInfo, setUserInfo] = useState({
    user: authUser.displayName,
    email: authUser.email,
    bookName: "",
    author: "",
    price: 0,
    quantity: 0,
    description: "",
    image: "",
  });

  //Click Handler Function for Adding a new Book
  const handleAddBook = (e) => {
   
    setAddBook({
      ...addBook,
      [e.target.name]: e.target.value,
    });
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
    
  };

  useEffect(() => {
     if(addBook?.bookName === books?.find(book => book?.bookName === addBook?.bookName)?.bookName){
      toast.error("Book Already Exists");
    }

  } , [addBook, books]);

  //Click Handler Function for Submitting New Book and User Info To The Server API
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosPrivate
      .post(
        "https://warehouse-management-saminravi.herokuapp.com/book",
        addBook,
        {
          headers: {
            email: authUser.email,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        if (data.insertedId) {
          toast.success("Book Added Successfully");
        }
      });

    axiosPrivate
      .post(
        "https://warehouse-management-saminravi.herokuapp.com/user",
        userInfo,
        {
          headers: {
            email: authUser.email,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        if (data.insertedId) {
          console.log("User Added Successfully");
        }
      });
    e.target.reset();
    toast.success("Book Added Successfully");
  };

  return (
    <div className="padding-nav">
      <div className="add-book-form">
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-lg-0 mb-5 text-center">
            Please Add New Book To Your Store
          </h1>
          <Form.Group
            className="mb-3 mt-5"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label className="checkout-labels">Your Name</Form.Label>
            <Form.Control
              disabled={authUser?.displayName ? true : false}
              value={authUser?.displayName}
              type="text"
              placeholder="First Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={authUser?.email}
              required
              disabled={authUser?.email ? true : false}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">
              Book Cover Image
            </Form.Label>
            <Form.Control
              onChange={handleAddBook}
              type="text"
              placeholder="Image URL of the Book"
              required
              name="image"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Book Name</Form.Label>
            <Form.Control
              onChange={handleAddBook}
              type="text"
              placeholder="Name Of Your Book"
              required
              name="bookName"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Name of Author</Form.Label>
            <Form.Control
              onChange={handleAddBook}
              type="text"
              name="author"
              placeholder="Book Author Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Description</Form.Label>

            <Form.Control
              onChange={handleAddBook}
              as="textarea"
              rows="3"
              placeholder="Description Of Your Book"
              required
              name="description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Price</Form.Label>
            <Form.Control
              onChange={handleAddBook}
              type="number"
              name="price"
              placeholder="Number of Stock"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="checkout-labels">Number Of Stock</Form.Label>
            <Form.Control
              onChange={handleAddBook}
              type="number"
              name="quantity"
              placeholder="Number of Stock"
              required
            />
          </Form.Group>

          <Button
            className="px-5 d-block mx-auto checkout-labels"
            variant="primary"
            type="submit"
            disabled={
              addBook?.bookName === books?.find(book => book?.bookName === addBook?.bookName)?.bookName ? true : false
            }
          >
            Add This Item To The Store
            <FontAwesomeIcon className="ms-2" icon={faFilePen} />
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddItems;
