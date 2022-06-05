import React, { useState } from "react";
import { FormData } from "./constants";

type Props = {
    elevatorNum: number;
    maxFloor: number;
    submitData: (data: FormData) => void;
};

const Controls = (props: Props) => {
    const [formData, setFormData] = useState<FormData>({
        elevatorNo: 0,
        floorFrom: 0,
        floorTo: 0,
    });

    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.id;
        const value = parseInt(e.target.value);
        if (
            e.target.id == "elevatorNo" &&
            (value < 0 || value >= props.elevatorNum)
        )
            return;
        if (value < 0 || value > props.maxFloor) return;
        setFormData((values) => ({ ...values, [name]: value }));
    };

    return (
        <div className="elevatorControls">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    props.submitData(formData);
                }}
            >
                <label htmlFor="elevatorNo">numer windy</label>
                <input
                    type="number"
                    id="elevatorNo"
                    onChange={(e) => updateFormData(e)}
                    value={formData.elevatorNo}
                />
                <label htmlFor="floorTo">piętro do</label>
                <input
                    type="number"
                    id="floorTo"
                    onChange={(e) => updateFormData(e)}
                    value={formData.floorTo}
                />
                <label htmlFor="floorFrom">piętro z</label>
                <input
                    type="number"
                    id="floorFrom"
                    onChange={(e) => updateFormData(e)}
                    value={formData.floorFrom}
                />
                <input type="submit" value="Wyślij żądanie" />
            </form>
        </div>
    );
};

export default Controls;
