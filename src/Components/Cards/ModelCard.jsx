import { Link } from "react-router";

const ModelCard = ({ data, allModelsPath }) => {
  const { image, framework, name, description, useCase, _id } = data;

  return (
    <div className="relative group bg-slate-200 rounded-[32px] p-[1px] transition-all duration-500 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 shadow-sm hover:shadow-xl">
      <div className="bg-white rounded-[31px] overflow-hidden h-full flex flex-col">
        <figure className="relative h-64 overflow-hidden m-2 rounded-[24px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
            {framework}
          </div>
        </figure>

        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
            {name}
          </h2>

          <p className="text-sm text-slate-500 mt-3 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {allModelsPath && (
            <div className="mt-4 pt-4 border-t border-slate-50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                Primary Use Case
              </p>
              <p className="text-sm text-slate-700 mt-1 font-medium line-clamp-1">
                {useCase}
              </p>
            </div>
          )}
          <div className="mt-auto pt-6">
            <Link
              to={`/modelCardDetails/${_id}`}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white border-2 border-slate-900 text-slate-900 font-black text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-slate-900 hover:text-white active:transform active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none group/btn"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
