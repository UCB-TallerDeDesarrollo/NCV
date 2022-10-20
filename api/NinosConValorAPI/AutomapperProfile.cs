using AutoMapper;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;
using NinosConValorAPI.Models.Security;

namespace NinosConValorAPI
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            this.CreateMap<FixedAssetEntity, FixedAssetModel>()
                .ForMember(mod => mod.ProgramHouseId, ent => ent.MapFrom(entSrc => entSrc.ProgramHouse.Id))
                .ReverseMap()
                .ForMember(ent => ent.ProgramHouse, mod => mod.MapFrom(modSrc => new ProgramHouseEntity() { Id = modSrc.ProgramHouseId }))
                .ReverseMap();
            this.CreateMap<KidEntity, KidModel>()
                .ReverseMap();
            this.CreateMap<HealthReportEntity, HealthReportModel>()
                .ReverseMap();
            this.CreateMap<BiometricsEntity, BiometricsModel>()
                .ReverseMap();
            this.CreateMap<ProgramHouseEntity, ProgramHouseModel>()
                .ForMember(mod => mod.ResponsibleId, ent => ent.MapFrom(entSrc => entSrc.ResponsibleUser.Id))
                .ReverseMap()
                .ForMember(ent => ent.ResponsibleUser, mod => mod.MapFrom(modSrc => new IdentityAppUser() { Id = modSrc.ResponsibleId }));
        }
    }
}
