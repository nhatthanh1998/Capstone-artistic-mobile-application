import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initAlbums, selectAlbums } from '../../../../redux/slicers/albumss.slicer';
import { fetchAlbums } from '../../../../apis/albums'
import _ from 'lodash'


export const AlbumPicker = ({selectedAlbum, setSelectedAlbum}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const albums = useSelector(selectAlbums)
  const dispatch = useDispatch()

  useEffect(() => {
    if(_.isEmpty(albums)) {
      fetchAlbums().then(({data}) => {
        dispatch(initAlbums(data))
      })
    } else {
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