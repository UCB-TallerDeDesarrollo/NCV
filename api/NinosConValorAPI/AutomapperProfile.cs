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
                .ReverseMap()
                .ForMember(mod => mod.AssetTypeId, ent => ent.MapFrom(entSrc => entSrc.AssetType.Id))
                .ReverseMap()
                .ForMember(ent => ent.AssetType, mod => mod.MapFrom(modSrc => new AssetTypeEntity() { Id = modSrc.AssetTypeId }))                
                .ReverseMap()
                .ForMember(mod => mod.AssetStateId, ent => ent.MapFrom(entSrc => entSrc.AssetState.Id))
                .ReverseMap()
                .ForMember(ent => ent.AssetState, mod => mod.MapFrom(modSrc => new AssetStateEntity() { Id = modSrc.AssetStateId }))
                .ReverseMap()
                .ForMember(mod => mod.AssetResponsibleId, ent => ent.MapFrom(entSrc => entSrc.AssetResponsible.Id))
                .ReverseMap()
                .ForMember(ent => ent.AssetResponsible, mod => mod.MapFrom(modSrc => new AssetResponsibleEntity() { Id = modSrc.AssetResponsibleId }))
                .ReverseMap();
            this.CreateMap<KidEntity, KidModel>()
                .ForMember(mod => mod.ProgramHouse, ent => ent.MapFrom(entSrc => entSrc.ProgramHouse.Name ))
                .ReverseMap()
                .ForMember(ent => ent.ProgramHouse, mod => mod.MapFrom(modSrc => new ProgramHouseEntity() { Name = modSrc.ProgramHouse } ));
            this.CreateMap<HealthReportEntity, HealthReportModel>()
                .ReverseMap();
            this.CreateMap<LegalReportEntity, LegalReportModel>()
                .ReverseMap();
            this.CreateMap<BiometricsEntity, BiometricsModel>()
                .ReverseMap();
            this.CreateMap<ContactEntity, ContactModel>()
                .ReverseMap();
            this.CreateMap<FamilyReportEntity, FamilyReportModel>()
                .ReverseMap();
            this.CreateMap<FoundationReportEntity, FoundationReportModel>()
                .ReverseMap();
            this.CreateMap<ProgramHouseEntity, ProgramHouseModel>()
                .ForMember(mod => mod.ResponsibleId, ent => ent.MapFrom(entSrc => entSrc.ResponsibleUser.Id))
                .ReverseMap()
                .ForMember(ent => ent.ResponsibleUser, mod => mod.MapFrom(modSrc => new IdentityAppUser() { Id = modSrc.ResponsibleId }));
            this.CreateMap<AssetCategoryEntity, AssetCategoryModel>()
                .ReverseMap();
            this.CreateMap<AssetTypeEntity, AssetTypeModel>()
                .ForMember(mod => mod.AssetCategoryId, ent => ent.MapFrom(entSrc => entSrc.AssetCategory.Id))
                .ReverseMap();
            this.CreateMap<AssetStateEntity, AssetStateModel>()
                .ReverseMap();
            this.CreateMap<AssetResponsibleEntity, AssetResponsibleModel>()
                .ReverseMap();
            this.CreateMap<EducationReportEntity, EducationReportModel>()
                .ReverseMap();
        }
    }
}
