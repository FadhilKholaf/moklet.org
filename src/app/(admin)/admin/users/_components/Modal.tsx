import { H3 } from "@/app/_components/global/Text";
import { FaX } from "react-icons/fa6";
import { TextField, SelectField } from "@/app/_components/global/Input";
import { UserWithLastlog } from "@/types/entityRelations";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { updateUserWithId } from "../action";
import FormButton from "./part/SubmitButton";
import { Roles } from "@prisma/client";

export default function Modal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: UserWithLastlog | null;
}) {
  async function update(formdata: FormData) {
    const toastId = toast.loading("Loading...");
    const result = await updateUserWithId(data?.id!, formdata);
    if (!result.error) {
      toast.success(result.message, { id: toastId });
      setIsOpenModal(false);
    } else toast.error(result.message, { id: toastId });
  }
  return (
    <div className="bg-gray-300/50 fixed w-full lg:w-[calc(100%-20rem)] z-10 justify-center items-center top-0 right-0 h-full m-auto">
      <div className="relative p-4 w-full h-full max-w-2xl max-h-full m-auto top-20">
        <div className="relative bg-white rounded-lg">
          <form action={update}>
            <div className="flex items-center justify-between p-4 md:p-5 border-b">
              <H3>User Data</H3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all"
                onClick={() => setIsOpenModal(false)}
              >
                <FaX size={16} />
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <TextField
                type="text"
                name="name"
                required
                value={data?.name}
                label="Name"
                placeholder="John Doe"
              />
              <TextField
                type="email"
                name="email"
                label="Email"
                value={data?.email}
                placeholder="xx@smktelkom-mlg.sch.id"
                required
              />
              <SelectField
                label="Role"
                name="role"
                required
                value={data?.role}
                options={Object.values(Roles).map((role) => ({
                  label: role,
                  value: role,
                }))}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                placeholder="**********"
              />
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end">
              <FormButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
