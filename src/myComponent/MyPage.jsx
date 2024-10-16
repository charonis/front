import { useParams } from "react-router-dom";
import styles from "./MyPage.module.css";
import { useEffect, useState } from "react";
import { exps } from "./MyExample.js";
import axios from "axios";
export function MyPage() {
  const { key } = useParams();

  const [info, setInfo] = useState({});

  async function getDate() {
    if (key != undefined) {
      await axios({
        method: "get",
        url: `https://tstss-six.vercel.app/qr_code/get_date?unique_key=${key}`,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((response) => {
          setInfo(response.data);
        })
        .catch((response) => {
          setInfo({ error: "500" });
        });
    } else {
      setInfo(exps);
    }
  }

  useEffect(() => {
    getDate();
  }, []);

  return (
    <div className={styles.main_block}>
      <div className={styles.nav_block}>
        <div className={styles.block_name}>
          <p className={styles.name}>{info.first_name}</p>
          <p className={styles.name}>{info.name}</p>
          <p className={styles.name}>{info.patronymic}</p>
        </div>
        <hr color="#f2f2f2"></hr>
      </div>
      <div className={styles.block_info}>
        <div className={styles.info}>{info.info}</div>
      </div>
    </div>
  );
}
