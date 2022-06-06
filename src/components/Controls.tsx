import React from "react";
import { useForm } from "react-hook-form";
import { FormData } from "./types";
import "../styles/Controls.sass";

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
                <input
                    type="number"
                    {...register("elevatorNo", {
                        required: true,
                        min: 0,
                        max: elevatorNum - 1,
                    })}
                    id="elevatorNo"
                />
                <label>Piętro z:</label>
                <input
                    type="number"
                    {...register("floorFrom", {
                        required: true,
                        min: 0,
                        max: maxFloor,
                    })}
                    id="floorFrom"
                />
                <label>Piętro do:</label>
                <input
                    type="number"
                    {...register("floorTo", {
                        required: true,
                        min: 0,
                        max: maxFloor,
                    })}
                    id="floorTo"
                />
                <input type="submit" value="wyślij zapytanie" />
            </form>
        </div>
    );
};

export default Controls;
