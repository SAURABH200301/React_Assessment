import React, { useState } from "react";
import { Checkbox, ListItem, ListItemText } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./Component2.module.css";

interface Department {
  department: string;
  sub_departments: string[];
}

const initialDepartments: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const Component2: React.FC = () => {
  const [departmentStates, setDepartmentStates] = useState<{
    [key: string]: boolean | undefined;
  }>({});

  const handleDepartmentChange = (department: string): void => {
    setDepartmentStates((prevStates) => {
      const newState = { ...prevStates };
      newState[department] = !newState[department];

      if (newState[department]) {
        initialDepartments
          .find((dept) => dept.department === department)
          ?.sub_departments.forEach((subDept) => {
            newState[subDept] = true;
          });
      } else {
        initialDepartments
          .find((dept) => dept.department === department)
          ?.sub_departments.forEach((subDept) => {
            newState[subDept] = false;
          });
      }

      return newState;
    });
  };

  const handleSubDepartmentChange = (subDepartment: string): void => {
    setDepartmentStates((prevStates) => {
      const newState = { ...prevStates };
      newState[subDepartment] = !newState[subDepartment];

      const department = initialDepartments.find((dept) =>
        dept.sub_departments.includes(subDepartment)
      )?.department;

      if (department) {
        const allSubDepartments = initialDepartments.find(
          (dept) => dept.department === department
        )?.sub_departments;

        if (allSubDepartments) {
          const allChecked = allSubDepartments.every(
            (subDept) => newState[subDept] || newState[subDept] === undefined
          );
          const allUnchecked = allSubDepartments.every(
            (subDept) => !newState[subDept] || newState[subDept] === undefined
          );

          newState[department] = allChecked
            ? true
            : allUnchecked
            ? false
            : undefined;
        }
      }

      return newState;
    });
  };

  return (
    <div className={classes.mainDiv}>
      {initialDepartments.map((dept) => (
        <div>
          <Accordion className={classes.main}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.accSum}
              >
                <Typography>
                  <ListItem>
                    <Checkbox
                      indeterminate={
                        departmentStates[dept.department] === undefined
                      }
                      checked={!!departmentStates[dept.department]}
                      onChange={() => handleDepartmentChange(dept.department)}
                    />
                    <ListItemText primary={dept.department} />
                  </ListItem>
                </Typography>
              </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {dept.sub_departments.map((subDept) => (
                  <ListItem key={subDept}>
                    <Checkbox
                      checked={!!departmentStates[subDept]}
                      onChange={() => handleSubDepartmentChange(subDept)}
                    />
                    <ListItemText primary={subDept} />
                  </ListItem>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default Component2;
