using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;

namespace NinosConValorAPI
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            this.CreateMap<FixedAssetEntity, FixedAssetModel>()
                .ReverseMap();
            this.CreateMap<KidEntity, KidModel>()
               .ReverseMap();
        }
    }
}
