"use client";

import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function Today() {
  const [value, setValue] = useState({
    oficial: {
      value_avg: 0,
    },
    blue: {
      value_avg: 0,
    },
  });
  const [originalValue, setOriginalValue] = useState(value);

  const [inputValue, setInputValue] = useState(1);

  useEffect(() => {
    const getTodayValue = async () => {
      const todayValue = await fetch(`/api/today`).then((value) => {
        return value.json();
      });
      setValue(todayValue);
      console.log(todayValue);

      setOriginalValue(todayValue);
    };
    getTodayValue();
  }, []);

  useEffect(() => {
    const newOficialValue = originalValue.oficial.value_avg * inputValue;
    const newBlueValue = originalValue.blue.value_avg * inputValue;

    setValue({
      oficial: {
        value_avg: newOficialValue,
      },
      blue: {
        value_avg: newBlueValue,
      },
    });
  }, [inputValue]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "space-evenly", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { sm: "center" },
        marginBottom: 2,
      }}
    >
      <Box sx={{ marginRight: { sm: 10 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <p>Dollar</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-evenly" },
          }}
        >
          <TextField
            type="number"
            value={inputValue}
            onChange={(e) =>
              setInputValue(
                e.target.value === "" ? 0 : parseInt(e.target.value)
              )
            }
            sx={{
              width: 100,
              "& input": { color: "white" },
              "& fieldset": { borderColor: "white" },
              marginRight: 1,
            }}
          />
          <Button variant="contained" onClick={() => setInputValue(1)}>
            Reset
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ color: "#00ff00", marginRight: { sm: 2 } }}>
          <p>Oficial:</p>$ {value.oficial.value_avg}
        </Box>
        <Box sx={{ color: "#4169e1" }}>
          <p>Blue:</p>$ {value.blue.value_avg}
        </Box>
      </Box>
    </Box>
  );
}
