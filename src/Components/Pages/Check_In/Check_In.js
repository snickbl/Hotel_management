import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetFirestoreData } from "../../../findAll";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { saveRooms } from "../../../Redux/actions";

export const CheckIn = (roomInfo) => {
  const dispatch = useDispatch();

  useEffect(() => {
    GetFirestoreData(dispatch);
  }, []);

  let rooms = useSelector((state) => state.rooms);

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const { RangePicker } = DatePicker;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const DataSender = (data, values) => {
    rooms.map((e, index) => {
      if (e?.number == data?.number) {
        rooms[index].guest = values.username;
        rooms[index].isCheckedIn = true;

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        rooms[index].checkInDate = `${year}-${month}-${day}`;
        const db = getFirestore();

        const sender = async () => {
          try {
            await updateDoc(doc(db, "data", "1cB2lyPiRJfgRUYnlfzs"), {
              rooms: rooms,
            });
          } catch {
            console.log("ERROR");
          }
        };
        sender();
        dispatch(saveRooms(rooms));
      }
    });
  };

  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const values = {
      ...fieldsValue,
      "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
    };
    DataSender(roomInfo.roomInfo, values);
    GetFirestoreData(dispatch)  
    hideModal();
    // window.location.reload();
  };

  if (roomInfo.roomInfo?.guest == "") {
    return (
      <>
        <Button className="check_in_btn" type="primary" onClick={showModal}>
          Check In
        </Button>
        <Modal
          title="Check In"
          open={open}
          closable={false}
          footer={null}
          onCancel={hideModal}
        >
          <hr />
          <Form
            name="time_related_controls"
            {...formItemLayout}
            onFinish={onFinish}
            layout="vertical"
            style={{
              maxWidth: 472,
            }}
          >
            <Form.Item
              labelCol={{
                span: 0,
              }}
              wrapperCol={{
                span: 24,
              }}
              label="Please, enter the guest's name:"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Guest's name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{
                span: 24,
              }}
              name="date-picker"
              label="Please, enter the approximate date of guest checkout:"
              {...config}
            >
              <DatePicker />
            </Form.Item>
            <hr />
            <Form.Item
              wrapperCol={{
                span: 24,
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginTop: 40,
                  justifyContent: "flex-end",
                }}
              >
                <Button style={{ marginRight: 8 }} onClick={hideModal}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Confirm
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  } else {
    return (
      <Button className="check_in_btn" disabled>
        Check In
      </Button>
    );
  }
};
