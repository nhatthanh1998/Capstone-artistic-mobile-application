const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;


export const SelectAlbumDropDown = ({albums}) => {
    return (
<Select
            width={250}
            defaultValue="Select a Province in Canada ..."
            onSelect={value => {console.log("value:", value)}}>
            <Option>Alberta</Option>
            <Option>British Columbia</Option>
            <Option>Manitoba</Option>
            <Option>New Brunswick</Option>
            <Option>Newfoundland and Labrador</Option>
            <Option>Northwest Territories</Option>
            <Option>Nova Scotia</Option>
            <Option>Nunavut</Option>
            <Option>Ontario</Option>
            <Option>Prince Edward Island</Option>
            <Option>Quebec</Option>
            <Option>Saskatchewan</Option>
            <Option>Yukon</Option>
          </Select>
    )
}