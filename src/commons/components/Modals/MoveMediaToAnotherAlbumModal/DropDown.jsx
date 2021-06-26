import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect}  from 'react'


export const AlbumPicker = ({albums, selectedAlbum, setSelectedAlbum, setDisableMove}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if(albums!== null) {
      const albumData = albums.map(item => {
        return {label: item.name, value: item.id }
      })

      setItems(albumData)
      if(albumData.length !== 0) {
        setSelectedAlbum(albumData[0].value)
        setDisableMove(false)
      }
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