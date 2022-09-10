using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;

namespace NinosConValorAPI
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            this.CreateMap<ChildEntity, ChildModel>()
                .ReverseMap();
        }
    }
}
