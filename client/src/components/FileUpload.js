import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
   const [file, setFile] = useState("");
   const [filename, setFilename] = useState("Choose File");
   const [uploadfile, setuploadfile] = useState({});
   const [selector, setSelector] = useState("");
   const [newselector, setnewSelector] = useState("");
   const [firmware, setfirmware] = useState("");
   const [newfirmware, setnewfirmware] = useState("");
   const [date, setdate] = useState("");
   const [location, setlocation] = useState("");
   const [msg, setmsg] = useState("");

   const onchange = (e) => {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
   };
   const option = (e) => {
      setSelector(e.target.value);
   };
   const firm = (e) => {
      setfirmware(e.target.value);
   };
   const onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      try {
         const res = await axios.post("/upload", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });
         const { fileName, filePath } = res.data;
         setuploadfile({ fileName, filePath });
         setlocation(filePath);
         setmsg("file uploaded successfully");
      } catch (err) {
         if (err.response.status === 500) {
            setmsg("problem in server");
         } else {
            setmsg(err.response.msg);
         }
      }

      setnewSelector(selector);
      setnewfirmware(firmware);
      setdate(() => {
         const date = new Date();
         return date.toLocaleDateString();
      });
   };

   return (
      <>
         {msg ? (
            <>
               <div
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
               >
                  <strong>{msg}</strong>
                  <button
                     type="button"
                     class="close"
                     data-dismiss="alert"
                     aria-label="Close"
                  >
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
            </>
         ) : null}
         <div className="container">
            <div className="row">
               <div className="col">
                  <div className="card">
                     <div className="card-header bg-success text-white">
                        <h4>GramworkX File Upload</h4>
                     </div>
                     <div className="card-body">
                        <form onSubmit={onsubmit}>
                           <label htmlFor="">Device Model</label>
                           <div>
                              <select
                                 className="form-control form-control"
                                 onChange={option}
                                 value={selector}
                                 required
                              >
                                 <option>--Select Device--</option>
                                 <option value="gwx100">gwx100</option>
                                 <option value="gwx200">gwx200</option>
                              </select>
                           </div>
                           <div className="row">
                              <div className="col-md-6 mt-3">
                                 <label htmlFor="">Firmware Version</label>
                              </div>
                              <div className="col-md-6 mt-3">
                                 <label htmlFor="">Select Firmware</label>
                              </div>
                           </div>

                           <div className="row">
                              <div className="col-md-6">
                                 <input
                                    onChange={firm}
                                    type="text"
                                    className="form-control"
                                    required
                                 />
                              </div>
                              <div className="col-md-6">
                                 <div className="custom-file">
                                    <input
                                       type="file"
                                       className="custom-file-input"
                                       id="customFile"
                                       onChange={onchange}
                                       required
                                    />
                                    <label
                                       className="custom-file-label"
                                       htmlFor="customFile"
                                    >
                                       {filename}
                                    </label>
                                 </div>
                              </div>
                           </div>
                           <div className="container w-75 mt-3">
                              <label htmlFor="">
                                 * All fields are mandatory
                              </label>
                              <button
                                 type="submit"
                                 className="btn btn-outline-success btn-lg btn-block"
                              >
                                 UPDATE NEW FIRMWARE
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="container-fluid mt-5">
            <div className="row">
               <div className="col">
                  <div className="card">
                     <div className="card-header bg-success text-white">
                        <i className="fas fa-table"></i> Firmware Table
                     </div>
                     <div className="card-body">
                        <table className="table table-bordered">
                           <thead>
                              <tr>
                                 <th>GWX</th>
                                 <th>Firmware</th>
                                 <th>File Path</th>
                                 <th>Created At</th>
                              </tr>
                           </thead>
                           <tbody>
                              {uploadfile ? (
                                 <>
                                    <tr>
                                       <td>{newselector}</td>
                                       <td>{newfirmware}</td>
                                       <td>{location}</td>
                                       <td>{date}</td>
                                    </tr>
                                 </>
                              ) : null}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default FileUpload;
