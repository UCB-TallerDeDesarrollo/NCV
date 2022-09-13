using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Services
{
    interface IKidService
    {
        public Task<KidModel> CreateKidAsync(KidModel kid);
    }
}
