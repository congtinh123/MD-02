import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ListStudent({
  deleteStudent,
  listStudent,
  handleSubmit,
  handleSave,
  handleCloseEdit,
  openEdit,
  handleOpenEdit,
  handleSort,
  handleFilter,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const student = JSON.parse(localStorage.getItem("student"));
  return (
    <>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Chỉnh Sửa Sinh Viên</h2>
          <form onSubmit={handleSave} className="studentinfor_form">
            <div className="studentinfor_form--input">
              <label>Tên sinh viên</label>
              <input type="text" defaultValue={student.student_name} />
            </div>

            <div className="studentinfor_form--input">
              <label>Email</label>
              <input type="text" defaultValue={student.email} />
            </div>
            <div className="studentinfor_form--input">
              <label>Địa chỉ</label>
              <input type="text" defaultValue={student.address} />
            </div>
            <div className="studentinfor_form--input">
              <label>Số điện thoại</label>
              <input type="text" defaultValue={student.phone} />
            </div>
            <button type="submit" className="studentinfor_form--btn--add">
              SAVE
            </button>
          </form>
        </Box>
      </Modal>
      <div className="modal_btn-sort_form">
        <Button onClick={handleOpen}>Thêm Mới Sinh Viên</Button>
        <form onSubmit={handleFilter}>
          <input type="text" placeholder="Nhập Tên Sinh Viên" />
          <button className="modal_btn_filter">Tìm Kiếm</button>
        </form>
        <button onClick={handleSort}>Sắp xếp</button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2>Thông Tin Sinh Viên</h2>
            <form className="studentinfor_form" onSubmit={handleSubmit}>
              <div className="studentinfor_form--input">
                <label>Tên sinh viên</label>
                <input type="text" />
              </div>

              <div className="studentinfor_form--input">
                <label>Email</label>
                <input type="text" />
              </div>
              <div className="studentinfor_form--input">
                <label>Địa chỉ</label>
                <input type="text" />
              </div>
              <div className="studentinfor_form--input">
                <label>Số điện thoại</label>
                <input type="text" />
              </div>
              <button type="submit" className="studentinfor_form--btn--add">
                ADD
              </button>
            </form>
          </div>
        </Box>
      </Modal>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>
              <span className="custom-checkbox">
                <input type="checkbox" id="selectAll" />
                <label htmlFor="selectAll"></label>
              </span>
            </th>
            <th>Tên sinh viên</th>
            <th>Email</th>
            <th>Địc chỉ</th>
            <th>Số điện thoại</th>
            <th>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {listStudent.map((student) => {
            return (
              <tr key={student.id}>
                <td>
                  <span className="custom-checkbox">
                    <input
                      type="checkbox"
                      id={`checkbox-${student.id}`}
                      name="options[]"
                      value="1"
                    />
                    <label htmlFor={`checkbox-${student.id}`}></label>
                  </span>
                </td>
                <td>{student.student_name}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>
                  <EditIcon
                    onClick={() => handleOpenEdit(student.id)}
                    style={{ color: "rgb(250, 174, 9)", cursor: "pointer" }}
                  />
                  <DeleteIcon
                    style={{
                      color: "red",
                      marginLeft: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteStudent(student.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
