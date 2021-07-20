import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect}  from 'react'
import { useSelector } from 'react-redux';
import { selectAlbums } from '../../../../redux/slicers/albumss.slicer';


export const AlbumPicker = ({selectedAlbum, setSelectedAlbum}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const albums = useSelector(selectAlbums)

  useEffect(() => {
    if(albums !== null) {
      const albumData = Object.keys(albums).map(key => {
        return {label: albums[key].name, value: albums[key].id }
      })
      setItems(albumData)
      setSelectedAlbum(albumData[0].value)
    }
    return () => {}
  }, [albums])

  return (
    <DropDownPicker
      placeholder="Select album"
      searchable={false}
      open={open}
      value={selectedAlbum}
      items={items}
      setOpen={setOpen}
      setValue={setSelectedAlbum}
      setItems={setItems}
    />
  );
}