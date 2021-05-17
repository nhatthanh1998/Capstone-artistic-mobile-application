import React from 'react'
import { View, TextInput, Button } from "react-native"
import { useState } from 'react'
import tailwind from 'tailwind-rn'
import { useSelector, useDispatch } from 'react-redux';

import { selectCount, increase, decrease, reset } from "../../redux/slicers/couter.slicer"

export const Counter = () => {
    const dispatch = useDispatch()
    const count = useSelector(selectCount)

    const handleClickAdd = () => {
        dispatch(increase(count + 1))
    }

    const handleClickDecrease = () => {
        dispatch(decrease(count - 1))
    }

    const handleClickReset = () => {
        dispatch(reset())
    }

    return (
        <View style={tailwind("flex flex-wrap")}>
            <View class="flex w-8/12">
                <TextInput type="text" value={count} style={tailwind("bg-white text-gray-900 text-center border border-gray-800 w-full")} />
            </View>
            <View style={tailwind("flex flex-col w-4/12")}>
                <Button
                    title="increase"
                    style={tailwind("text-white text-center text-xl font-semibold rounded-tr-md px-1 bg-gray-800")}
                    onPress={() => {
                        handleClickAdd()
                    }}
                />
                <Button
                    title="decrease"
                    style={tailwind("text-white rounded-br-md px-1 bg-gray-800 ")}
                    onPress={() => {
                        handleClickDecrease()
                    }}
                />
                <Button
                    title="reset"
                    style={tailwind("text-white rounded-br-md px-1 bg-gray-800 ")}
                    onPress={() => {
                        handleClickReset()
                    }}
                />
            </View>
        </View>
    )
}
