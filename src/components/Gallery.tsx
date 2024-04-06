import { Card, Image, List } from "antd";
import { ProductDataType } from "../types/ProductType";

const { Meta } = Card;

interface Props {
  products: ProductDataType[];
  previewImgs: string[];
  loading: boolean;
  handlePreviewImg: (item: string[]) => void;
  resetPreviewImg: () => void;
}

const Gallery = ({
  products,
  previewImgs,
  loading,
  handlePreviewImg,
  resetPreviewImg,
}: Props) => {
  return (
    <>
      <div
        style={{
          margin: "0px 10px",
        }}
      >
        <List
          dataSource={products}
          loading={loading}
          grid={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 4 }}
          renderItem={(item: ProductDataType) => {
            return (
              <Card
                key={item?.id}
                hoverable
                style={{ width: 300, marginBottom: "20px" }}
                cover={
                  <Image
                    alt={item?.title}
                    preview={{ visible: false }}
                    src={item?.thumbnail}
                  />
                }
                onClick={() => handlePreviewImg(item.images)}
              >
                <Meta title={item?.title} description={item?.description} />
              </Card>
            );
          }}
        ></List>
        {previewImgs && previewImgs?.length > 0 && (
          <>
            <Image.PreviewGroup
              preview={{
                visible: previewImgs.length ? true : false,
                onVisibleChange: (value) => {
                  if (!value) {
                    resetPreviewImg();
                  }
                },
              }}
            >
              {previewImgs?.map((image: string, index: number) => (
                <Image key={index} src={image} />
              ))}
            </Image.PreviewGroup>
          </>
        )}
      </div>
    </>
  );
};

export default Gallery;
