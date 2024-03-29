import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, redirect, useOutletContext } from "react-router-dom";
import { FormRow, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

function Profile() {
  const { currentUser } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={currentUser.name} />
          <FormRow
            type="text"
            name="lastName"
            defaultValue={currentUser.lastName}
          />
          <FormRow type="email" name="email" defaultValue={currentUser.email} />
          <FormRow
            type="text"
            name="location"
            defaultValue={currentUser.location}
          />
        </div>
        <SubmitBtn formBtn />
      </Form>
    </Wrapper>
  );
}

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("avatar");
    if (file && file.size > 500000) {
      toast.error("Image size is too large");
      return null;
    }
    try {
      await customFetch.patch("/users/update-user", formData);
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["user"]);
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };

export default Profile;
