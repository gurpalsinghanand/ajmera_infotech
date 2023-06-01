import "./App.css";
import { fetchData, postData } from "./calls/apicalls";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { postSchema } from "./Schema";

function App() {
  const url = "https://reqres.in/api/users";
  const [listData, setListData] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [success, setSuccess] = useState();
  const [type, setType] = useState(1);
  const [asc, setAsc] = useState(1);

  useEffect(() => {
    try {
      fetchData(url).then((a) => {
        setListData(a["data"]["data"]);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const sorter = (a, b) => {
    if (type == 1) {
      if (a.id > b.id) {
        return asc * 1;
      } else if (a.id < b.id) {
        return asc * -1;
      } else {
        return 0;
      }
    }
    else {
      if (a.first_name + a.last_name > b.first_name + b.last_name) {
        return asc * 1;
      } else if (a.first_name + a.last_name < b.first_name + b.last_name) {
        return asc * -1;
      } else {
        return 0;
      }
    }
  };

  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
      },
      validationSchema: postSchema,
      onSubmit: (values) => {
        console.log(values);
        try {
          const postUrl =
            url +
            "?email=" +
            values.email +
            "&first_name=" +
            values.firstName +
            "&last_name=" +
            values.lastName;
          postData(postUrl).then((a) => {
            if (a.status == 201) {
              setSuccess(true);
            } else {
              setSuccess(false);
            }
          });
        } catch (e) {
          console.log(e);
        }
      },
    });
  return (
    <div className="App">
      <h3 className="toggle">
        <p onClick={() => setToggle(0)}>Get</p>
        <p onClick={() => setToggle(1)}>Post</p>
      </h3>
      {toggle == 0 ? (
        <table className="table">
          {listData ? (
            <tr>
              <td className="box">Photo</td>
              <td
                className="box"
                onClick={() => {
                  if (type == 1) {
                    setAsc(-1 * asc);
                  } else {
                    setAsc(1);
                    setType(1);
                  }
                }}
              >
                ID
              </td>
              <td
                className="box"
                onClick={() => {
                  if (type == 2) {
                    setAsc(-1 * asc);
                  } else {
                    setAsc(1);
                    setType(2);
                  }
                }}
              >
                Name
              </td>
              <td className="box">Email</td>
            </tr>
          ) : (
            ""
          )}
          {listData.sort(sorter)?.map((msg) => {
            return (
              <tr key={msg.id} className="table">
                <td className="box">
                  <img src={msg.avatar} />
                </td>
                <td className="box">{msg.id}</td>
                <td className="box">{msg.first_name + " " + msg.last_name}</td>
                <td className="box">{msg.email}</td>
              </tr>
            );
          })}
        </table>
      ) : (
        <div className="post">
          <div>Email: </div>
          <input
            name="email"
            value={values.email}
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          <p className="error">
            {errors.email && touched.email ? errors.email : null}
          </p>
          <br />
          <div>First Name: </div>
          <input
            name="firstName"
            value={values.firstName}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          <p className="error">
            {errors.firstName && touched.firstName ? errors.firstName : null}
          </p>
          <br />
          <div>Last Name: </div>
          <input
            name="lastName"
            value={values.lastName}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          <p className="error">
            {errors.lastName && touched.lastName ? errors.lastName : null}
          </p>
          <br />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <p>{success ? (success == 0 ? "Post Failed" : "Success") : ""}</p>
        </div>
      )}
    </div>
  );
}

export default App;
