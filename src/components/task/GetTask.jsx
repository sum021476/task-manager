import React, { useContext, useEffect, useState } from "react";
import { ContextApi } from "../context/Context";
import { Services } from "../services/Services";
import { Link, useNavigate } from "react-router-dom";
import styles from "./GetTask.module.css";

const GetTask = () => {
  const navigate = useNavigate();
  const { globalState } = useContext(ContextApi);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!globalState.id) {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const { data } = await Services.getTaskUser(globalState.id);
        setState(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleClick = () => {
    navigate("/Creation");
  };

  const handleDeleteClick = async (id) => {
    try {
      await Services.deleteTaskUser(id);
      setState(state.filter((val) => val.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogoutClick = () => {
    navigate("/UpdateTask");
  };
  if (loading) {
    return <h3 className={styles.loadingText}>Checking login status...</h3>;
  }

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.title}>Your Tasks</h2>

      {state.length ? (
        state.map((val, ind) => (
          <div key={ind} className={styles.card}>
            <h3>{val.title}</h3>
            <p>{val.content}</p>
            <div className={styles.btnGroup}>
              <Link to={"/updateTask"} state={{ ...val }}>
                <button className={styles.updateBtn}>Update</button>
              </Link>
              <button className={styles.deleteBtn} onClick={() => handleDeleteClick(val.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h3 className={styles.loadingText}>No tasks found.</h3>
      )}

      <div className={styles.actionButtons}>
        <button className={styles.addBtn} onClick={handleClick}>+</button>
        <button className={styles.logoutBtn} onClick={handleLogoutClick}>Logout</button>
      </div>
    </div>
  );
};

export default GetTask;
