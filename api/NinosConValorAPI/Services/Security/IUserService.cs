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
        Task<UserManagerResponse> CreateUserRoleAsync(CreateUserRoleViewModel model);
        Task<IEnumerable<UserBasicInformation>> GetUsersAsync();

        //Roles
        Task<UserManagerResponse> RegisterAdminUserAsync(RegisterViewModel model);
        Task<UserManagerResponse> RegisterAuntUserAsync(RegisterViewModel model);

    }
}
