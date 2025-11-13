import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/Context/AuthContext";
import Loader from "../../Components/Shared/Loader";
import Container from "../../Components/Container/Container";
import { Link } from "react-router";
import UseAxiosTokenSecure from "../../Hooks/UseAxiosTokenSecure";

const MyModelsPage = () => {
  const [modelsData, setModelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosTokenSecure();
  useEffect(() => {
    try {
      axiosSecure(`/models/specificsModals?email=${user?.email}`).then((res) =>
        setModelsData(res.data)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [user?.email, axiosSecure]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="py-3 md:py-10">
      <Container>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Framework</th>
                <th>Use Case</th>
                <th>Created by</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row*/}

              {modelsData.map((data, index) => (
                <tr key={data._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-16 w-16">
                          <img
                            className=""
                            src={data?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{data?.framework}</td>
                  <td>{data?.useCase}</td>
                  <td>{data?.createdBy}</td>
                  <th>
                    <Link
                      to={`/modelCardDetails/${data?._id}`}
                      className="btn btn-active"
                    >
                      View Details
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Framework</th>
                <th>Use Case</th>
                <th>Created by</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default MyModelsPage;
