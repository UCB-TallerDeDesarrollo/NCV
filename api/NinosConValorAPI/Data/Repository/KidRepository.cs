using NinosConValorAPI.Data.Entity;
using System.Security.Cryptography;

namespace NinosConValorAPI.Data.Repository
{
    public class KidRepository : IKidRepository
    {
        private IList<KidEntity> _kids;

        public KidRepository()
        {
            _kids = new List<KidEntity>();
            _kids.Add(new KidEntity()
            {
                Id = 1,
                FirstName= "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010,8,12),
                ProgramHouseId = 1,
                BirthPlace = new DateTime(2020, 8, 12),
                Gender = "Masculino"
            });

            _kids.Add(new KidEntity()
            {
                Id = 2,
                FirstName= "Ana",
                LastName = "Mamani",
                CI = "457877",
                BirthDate = new DateTime(2010,8,12),
                ProgramHouseId = 1,
                BirthPlace = new DateTime(2020, 8, 12),
                Gender = "Femenina"
            });

            _kids.Add(new KidEntity()
            {
                Id = 3,
                FirstName= "Mauricio",
                LastName = "Pelaez",
                CI = "1254812",
                BirthDate = new DateTime(2010,8,12),
                ProgramHouseId = 1,
                BirthPlace = new DateTime(2020, 8, 12),
                Gender = "Masculino"
            });
        }

        public KidEntity CreateKid(KidEntity kid)
        {
            var lastKid = _kids.OrderByDescending(k => k.Id).FirstOrDefault();
            int nextId = lastKid != null ? lastKid.Id + 1 : 1;
            kid.Id = nextId;
            _kids.Add(kid);
            return kid;
        }

        public KidEntity GetKid(int kidId)
        {
            var kid = _kids.FirstOrDefault(k => k.Id == kidId);
            return kid;
        }

        public IEnumerable<KidEntity> GetKids()
        {
            return _kids;
        }
    }
}
