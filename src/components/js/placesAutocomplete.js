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
import { addToPlaces } from "../../redux/placeSlice";
import "../../../src/components/styles/globals.css";
import { useEffect } from "react";

function PlacesAutocomplete({ setSelected }) {
  const places = useSelector((state) => state.places);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const dispatch = useDispatch();
  const onPlaceClicked = async (address) => {
    setValue(address, false);
    dispatch(
      addToPlaces({
        place: address,
      })
    );

    clearSuggestions();

    const results = await getGeocode({ address });
    const latlang = await getLatLng(results[0]);

    setSelected(latlang);
  };

  useEffect(() => {
    /* dispatch(fetchContent()); */
  }, [places]);

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
                        onClick={() => onPlaceClicked(item.description)}
                      >
                        {item.description}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <div>
                {JSON.parse(localStorage.getItem("placesHistory"))?.map
                  ?.length > 0 &&
                  JSON.parse(localStorage.getItem("placesHistory"))?.map(
                    (item) => (
                      <p className="lv-history-places">- {item.place}</p>
                    )
                  )}
                {JSON.parse(localStorage.getItem("placesHistory"))?.map
                  ?.length === 0 && (
                  <center>
                    <em>Search history is empty</em>
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
