using NinosConValorAPI.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NinosConValorAPI.Services.Security
{
    public interface IUserService
    {
        Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model);
        Task<UserManagerResponse> LoginUserAsync(LoginViewModel model);

        Task<UserManagerResponse> CreateRoleAsync(CreateRoleViewModel model);
    }
}
