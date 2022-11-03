import React, { Component } from 'react'
import { Descriptions, Card,Avatar, } from 'antd'
import { getPhoto, } from '../../../actions/orders/autopicker/manageInspectionReport';
import { connect } from "react-redux";
import { BASE_USER_PICTURE } from '../../../constants/const';

let thisObj = null;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class CarPartDescriptionReportForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: this.props.isDisabled,
      fileList: null,
      path: "",
      filePath: ""
    };
    thisObj = this;
  }

  async componentDidMount() {
    let description = this.props.description;
    const { dispatch } = this.props;
    if (description.photoUrl != null) {
      console.log(this.props.orderId);
      dispatch(getPhoto(localStorage.getItem("userId"), this.props.orderId, description.photoUrl)).then(
        (responce) => {
          this.setState({ fileList: responce })
        })
    }
    thisObj.setState({ isDisabled: this.props.isDisabled });
  }

  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  render() {
    let description = this.props.description;

    let imageForm = <Avatar
      size={{ xs: 240, sm: 320, md: 400, lg: 640, xl: 800, xxl: 1000 }}
      style={{
        maxHeight: 300, maxWidth: 300
      }}
      shape="square"
      src={description.photoUrl == null ? BASE_USER_PICTURE : `data:image/jpeg;base64,${this.state.fileList}`}
      preview={false}
    />

    return (
      <><Card style={{ width: 450 }}>

        <Descriptions >
          <Descriptions.Item
            label="Название части машины"
          >{description.describingPart}

          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            label="Комментарий"
          >
            {description.comment}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            label="Рекоммендация"
          >
            {description.recommendation}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions>
          <Descriptions.Item
            label="Фотография">
            {imageForm}

          </Descriptions.Item>

        </Descriptions></Card></>
    )
  }
}

function mapStateToProps(state) {
  const { report } = state.autoPicker;
  const { order } = state.userOrder;
  return {
    report, order
  };
}

export default connect(mapStateToProps)(CarPartDescriptionReportForm);

