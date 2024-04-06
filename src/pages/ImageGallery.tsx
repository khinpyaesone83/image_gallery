import { Col, Input, Pagination, Row, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Category from "../components/Category";
import Gallery from "../components/Gallery";
import { useCategoryStore, useSearchStore } from "../store";

const ImageGallery = () => {
  const store = useCategoryStore();
  const searchStore = useSearchStore();
  const search = searchStore.search;
  const category = store.category;
  const [previewImgs, setPreviewImgs] = useState<string[]>();
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  type QueryKeyType = [
    "products",
    {
      pageNum: number;
      limit: number;
      offset: number;
      q: string;
      category: string;
    }
  ];

  const { data, isLoading } = useQuery({
    queryKey: [
      "products",
      { limit: limit, offset: offset, q: search, category },
    ],
    queryFn: ({ queryKey }) => {
      const [, { limit, offset, q, category }] = queryKey as QueryKeyType;
      let url = category
        ? `https://dummyjson.com/products/category/${category}`
        : `https://dummyjson.com/products/search?limit=${limit}&skip=${offset}&q=${q}`;
      return axios.get(url).then((res) => res.data);
    },
  });

  const CalculateOffset = (page: number, pageSize: number) => {
    return (page - 1) * pageSize;
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset(CalculateOffset(page, 10));
  };

  return (
    <>
      <Typography.Title style={{ textAlign: "center" }}>
        Image Gallery
      </Typography.Title>
      <Row>
        <Col span={4} xs={0} sm={0} md={4}>
          <Category />
        </Col>
        <Col span={20} xs={24} sm={24}>
          <div style={{ margin: "0px 10px", textAlign: "center" }}>
            <Input.Search
              style={{
                maxWidth: "400px",
                marginRight: "auto",
                display: "flex",
                marginBottom: "20px",
              }}
              onSearch={(value) => {
                searchStore.setSearch(value);
                store.setCategory("");
              }}
              placeholder="Search..."
            ></Input.Search>
          </div>

          <Gallery
            products={data?.products}
            previewImgs={previewImgs || []}
            loading={isLoading}
            handlePreviewImg={(images) => setPreviewImgs(images)}
            resetPreviewImg={() => setPreviewImgs([])}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px",
            }}
          >
            {data?.products?.length > 0 && (
              <Pagination
                defaultCurrent={currentPage}
                current={currentPage}
                defaultPageSize={10}
                showSizeChanger={false}
                onChange={(page) => handlePageChange(page)}
                total={data?.total}
              />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ImageGallery;
