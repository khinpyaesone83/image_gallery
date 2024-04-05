import { Card, Image, List } from "antd";
import { ProductDataType } from "../types/ProductType";

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
      <List
        dataSource={products}
        loading={loading}
        grid={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 4 }}
        renderItem={(item: ProductDataType) => {
          return (
            <Card hoverable key={item.id} style={{ margin: "12px" }}>
              <Image
                src={item.thumbnail}
                preview={{ visible: false }}
                onClick={() => handlePreviewImg(item.images)}
              ></Image>
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
    </>
  );
};

export default Gallery;
