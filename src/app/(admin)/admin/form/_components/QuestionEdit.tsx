"use client";

import { Field_Type } from "@prisma/client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  MouseEvent,
} from "react";
import { FaTrash } from "react-icons/fa";

import { Button } from "@/app/_components/global/Button";
import { SelectField, TextField } from "@/app/_components/global/Input";
import { H4, P } from "@/app/_components/global/Text";
import { FieldsWithOptions } from "@/types/entityRelations";
import { arrayMove } from "@/utils/atomics";

export default function QuestionEdit({
  fields,
  setFields,
  formId,
}: {
  fields: FieldsWithOptions[];
  setFields: Dispatch<SetStateAction<FieldsWithOptions[]>>;
  formId: string;
}) {
  //Dragable element
  function dragElement(e: React.DragEvent<HTMLDivElement>, index: number) {
    e.dataTransfer.setData("index", index.toString());
  }
  function allowDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }
  function dropElement(e: React.DragEvent<HTMLDivElement>, index: number) {
    e.preventDefault();

    const id = parseInt(e.dataTransfer.getData("index"));

    setFields((prev) => {
      const arr = [...prev];
      arrayMove(arr, id, index);
      return arr;
    });
  }

  function removeField(index: number, e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!confirm("Apakah Anda yakin ingin menghapus ini?")) return;

    setFields((prev) => {
      const array = [...prev];
      array.splice(index, 1);
      return array;
    });
  }

  function addOption(e: SyntheticEvent) {
    e.preventDefault();

    const { index, inputOption } = e.target as typeof e.target & {
      index: { value: string };
      inputOption: { value: string };
    };
    const indexNum = parseInt(index.value);

    if (!inputOption.value || inputOption.value == "") {
      return alert("Input tidak boleh kosong!");
    }

    const questions = [...fields];

    questions[indexNum].options = Array.from(
      new Set([
        ...questions[indexNum].options,
        {
          field_id: fields[indexNum].id,
          id: 0,
          value: inputOption.value,
        },
      ]),
    );

    setFields(questions);
    inputOption.value = "";
  }

  function removeOption(
    index: number,
    indexOption: number,
    e: MouseEvent<HTMLLIElement>,
  ) {
    e.preventDefault();

    setFields((prev) => {
      const array = [...prev];
      array[index].options.splice(indexOption, 1);
      return array;
    });
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();

    type FieldsProps = keyof (typeof fields)[0];
    const name = e.target.name;
    const value = e.target.value;
    const index = parseInt(name.split("_")[0]);
    const props = name.split("_")[1] as FieldsProps;

    setFields((prev) => {
      const array = [...prev];
      (array[index][props] as FieldsProps) = (
        e.target.type == "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value
      ) as FieldsProps;

      return array;
    });
  };

  const handleLabelChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;
    const index = parseInt(name.split("_")[0]);

    const tempFields = fields;
    tempFields[index].label = value;
    setFields(tempFields);
  };

  function addQuestion(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFields((prev) => {
      return [
        ...prev,
        {
          form_id: formId,
          id: 0,
          label: "New Question",
          options: [],
          required: true,
          type: "text",
          fieldNumber: fields.length,
        },
      ];
    });
  }
  return (
    <div className="flex flex-col gap-4 transition-all">
      <H4>Pertanyaan</H4>
      {fields.map((item, index) => {
        return (
          <div
            key={item.id + "_" + index + "_" + item.fieldNumber}
            className="p-4 bg-white rounded-md flex flex-col gap-2 cursor-move transition-all"
            draggable
            onDragStart={(e) => dragElement(e, index)}
            onDrop={(e) => dropElement(e, index)}
            onDragOver={allowDrop}
          >
            <div className="w-full flex justify-between">
              <span className="text-black font-semibold">No. {index + 1}</span>
              <button
                onClick={(e) => removeField(index, e)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all"
              >
                <FaTrash />
              </button>
            </div>
            <SelectField
              name={index + "_type"}
              label="Jenis Pertanyaan"
              options={(
                Object.keys(Field_Type) as Array<keyof typeof Field_Type>
              ).map((key) => {
                return { label: key.toUpperCase(), value: key };
              })}
              value={item.type}
              required
              handleChange={handleChange}
            />
            <TextField
              name={index + "_label"}
              label="Label pertanyaan"
              type="text"
              value={item.label}
              required
              handleChange={handleLabelChange}
            />
            {["radio", "checkbox"].includes(item.type) && (
              <div>
                <form
                  className="flex flex-col md:flex-row gap-2 md:items-end"
                  onSubmit={addOption}
                >
                  <TextField
                    name="inputOption"
                    label="Pilihan Jawaban"
                    type="text"
                  />
                  <input type="hidden" name="index" value={index} />
                  <div>
                    <Button variant={"primary"} type="submit">
                      Tambahkan
                    </Button>
                  </div>
                </form>
                <ul className="list-disc list-inside mt-2">
                  {item.options.map((option, indexOption) => (
                    <li
                      key={item.id + "_option" + option.id}
                      onClick={(e) => removeOption(index, indexOption, e)}
                      className="cursor-pointer hover:text-red-500 transition-all"
                    >
                      {option.value}
                    </li>
                  ))}
                </ul>
                <P>Klik untuk menghapus pilihan</P>
              </div>
            )}
            <div className="flex gap-x-2 cursor-pointer items-center">
              <input
                type="checkbox"
                name={index + "_required"}
                value="true"
                defaultChecked={item.required}
                className="w-5 h-5 cursor-pointer bg-white text-primary-500 accent-primary-500 shrink-0 mt-0.5 border-gray-200 rounded focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none transition-all"
                id={index + "_required"}
                onChange={handleChange}
              />
              <label
                htmlFor={index + "_required"}
                className="cursor-pointer ms-2"
              >
                Harus diisi
              </label>
            </div>
          </div>
        );
      })}
      <Button variant={"primary"} onClick={addQuestion} className="w-full">
        Tambah Pertanyaan
      </Button>
    </div>
  );
}
