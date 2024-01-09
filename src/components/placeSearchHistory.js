import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function PlaceSearchHistory({ status, data }) {
  return (
    <div>
      <Card sx={{ minWidth: "33vw" }}>
        <CardHeader
          action={
            <IconButton
            /*   onClick={onRemoveAllButtonClicked}
            disabled={places.length === 0 || synching} */
            >
              <DeleteSweepIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ backgroundColor: "whitesmoke" }}>
          {status === "OK" ? (
            <List
              dense={true}
              /*   onMouseLeave={onListMouseLeave} */
              sx={{ maxHeight: "50vh", overflow: "auto" }}
            >
              {data.map((item, index) => (
                <ListItem
                  key={item.place_id}
                  secondaryAction={
                    <IconButton
                      /*  onClick={(ev) => onRemoveButtonClicked(ev, index)}
                    disabled={synching} */
                      sx={{
                        /*   display: actionVisibleIndex === index ? "block" : "none", */
                        ml: 2,
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  /*   onMouseOver={(ev) => onPlaceHover(ev, index)} */
                >
                  <ListItemButton>
                    <ListItemText
                    /*        onClick={(ev) => onPlaceClicked(ev, index)} */
                    >
                      {item.description}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <center>
              <em>Search history is empty</em>
            </center>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default PlaceSearchHistory;
