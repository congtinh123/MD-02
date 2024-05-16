import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListStudent from "../mock-api/client/ListStudent.jsx";
import axios from "axios";

function App() {
  //variable sort,filter
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [listStudent, setListStudent] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/students?_sort=${sort}&student_name=${filter}`
      )
      .then((res) => {
        setListStudent(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [sort, filter]);
  const [count, setCount] = useState(0);
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:3000/students/${id}`);
    const index = listStudent.findIndex((student) => student.id == id);
    listStudent.splice(index, 1);
    setListStudent([...listStudent]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const addStudent = {
      student_name: event.target[0].value,
      email: event.target[1].value,
      address: event.target[2].value,
      phone: event.target[3].value,
      status: true,
      create_at: new Date(),
    };
    axios.post(`http://localhost:3000/students`, addStudent).then((res) => {
      setListStudent([...listStudent, res.data]);
    });
  };
  const handleSave = (event) => {
    event.preventDefault();
    const student = JSON.parse(localStorage.getItem("student"));
    const indexStudent = listStudent.findIndex((ele) => student.id == ele.id);
    console.log(indexStudent);
    axios
      .patch(`http://localhost:3000/students/${student.id}`, {
        student_name: event.target[0].value,
        email: event.target[1].value,
        address: event.target[2].value,
        phone: event.target[3].value,
        status: true,
        create_at: new Date(),
      })
      .then(() => {
        listStudent[indexStudent].student_name = event.target[0].value;
        listStudent[indexStudent].email = event.target[1].value;
        listStudent[indexStudent].address = event.target[2].value;
        listStudent[indexStudent].phone = event.target[3].value;
        setListStudent([...listStudent]);
        setOpenEdit(false);
        localStorage.setItem(
          "student",
          JSON.stringify(listStudent[indexStudent])
        );
      })
      .catch((error) => console.error(error));
  };

  const handleOpenEdit = (id) => {
    setOpenEdit(!openEdit);
    axios.get(`http://localhost:3000/students/${id}`).then((res) => {
      localStorage.setItem("student", JSON.stringify(res.data));
    });
    // const index = listStudent.findIndex((student) => student.id == id);
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const handleSort = () => {
    setSort("student_name");
  };
  const handleFilter = (event) => {
    event.preventDefault();
    const inputValue = event.target[0].value;
    setFilter(inputValue);
  };
  return (
    <>
      <ListStudent
        openEdit={openEdit}
        handleOpenEdit={handleOpenEdit}
        handleCloseEdit={handleCloseEdit}
        handleSave={handleSave}
        deleteStudent={deleteStudent}
        listStudent={listStudent}
        handleSubmit={handleSubmit}
        handleSort={handleSort}
        handleFilter={handleFilter}
      />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
