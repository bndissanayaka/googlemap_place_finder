import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { addToPlaces, clearHistory } from "../../redux/placeSlice";
import "../../../src/components/styles/globals.css";
import { useEffect } from "react";
import { CardHeader, IconButton } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function PlacesAutocomplete({ setSelected }) {
  const places = useSelector((state) => state.places);
  const dispatch = useDispatch();

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
  } = usePlacesAutocomplete();

  const onPlaceClicked = async (address) => {
    setValue(address, false);
    dispatch(
      addToPlaces({
        place: address,
      })
    );

    setValue("");

    const results = await getGeocode({ address });
    const latlang = await getLatLng(results[0]);

    setSelected(latlang);
  };

  useEffect(() => {
    /* dispatch(fetchContent()); */
  }, [places]);

  const removeHistory = () => {
    dispatch(clearHistory());
  };

  return (
    <div className="lv-location-input">
      <Card sx={{ mb: ".5vw", minWidth: "33vw" }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              sx={{ flexGrow: 1 }}
              value={value}
              label="Search an address "
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
            />
          </Box>
          {localStorage.getItem("placesHistory")?.length > 0 && (
            <CardHeader
              action={
                <IconButton onClick={removeHistory}>
                  <DeleteSweepIcon />
                  <p className="lv-delete-text" onClick={removeHistory}>
                    Delete History
                  </p>
                </IconButton>
              }
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {status === "OK" ? (
              <List
                dense={true}
                sx={{
                  maxHeight: "20vh",
                  overflow: "auto",
                  padding: 0,
                  width: "30vw",
                  lineHeight: "2px",
                }}
              >
                {data.map((item, index) => (
                  <ListItem key={item.place_id}>
                    <ListItemButton>
                      <ListItemText
                        onClick={() => onPlaceClicked(item?.description)}
                      >
                        {item.description}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <div>
                {localStorage.getItem("placesHistory")?.length > 0 &&
                  JSON.parse(localStorage.getItem("placesHistory"))?.map(
                    (item) => (
                      <p className="lv-history-places">- {item?.place}</p>
                    )
                  )}
                {localStorage.getItem("placesHistory")?.length === 0 && (
                  <center>
                    <p className="lv-history-text">Search history is empty</p>
                  </center>
                )}
              </div>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default PlacesAutocomplete;
