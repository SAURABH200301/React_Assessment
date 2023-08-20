import React, { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Component2 from "./Component2";
import classes from './Component1.module.css'

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Component1: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data: Post[]) => {
        setPosts(data);
      });
  }, []);
  const rows: GridRowsProp = posts;

  const columns: GridColDef[] = [
    { field: "userId", headerName: "UserId", width: 200 },
    { field: "id", headerName: "Id", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "body", headerName: "Content", width: 400 },
  ];
  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
      <div className={classes.comp2}>
        <Component2/>
      </div>
    </div>
  );
};

export default Component1;
