import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect}  from 'react'


export const AlbumPicker = ({albums, selectedAlbum, setSelectedAlbum}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([]);

  useEffect(() => {
    if(albums!== null) {
      const albumData = albums.data.map(item => {
        return {label: item.name, value: item.id }
      })

      setItems(albumData)
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