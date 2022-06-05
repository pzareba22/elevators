import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "./constants";

type Props = {
    elevatorNum: number;
    maxFloor: number;
    submitData: (data: FormData) => void;
};

type Inputs = {
    elevatorNo: number;
    floorFrom: number;
    floorTo: number;
};

const Controls: React.FC<Props> = ({ elevatorNum, maxFloor, submitData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    return (
        <div className="elevatorControls">
            <form onSubmit={handleSubmit(submitData)}>
                <label>id Windy:</label>
                <input {...register("elevatorNo")} />
                <label>Piętro z:</label>
                <input {...register("floorFrom")} />
                <label>Piętro do:</label>
                <input {...register("floorTo")} />
                <input type="submit" value="wyślij zapytanie" />
            </form>
        </div>
    );
};

export default Controls;
