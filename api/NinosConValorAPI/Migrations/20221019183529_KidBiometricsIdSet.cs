using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class KidBiometricsIdSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BiometricsEntity_Kid_KidId",
                table: "BiometricsEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BiometricsEntity",
                table: "BiometricsEntity");

            migrationBuilder.RenameTable(
                name: "BiometricsEntity",
                newName: "Biometrics");

            migrationBuilder.RenameIndex(
                name: "IX_BiometricsEntity_KidId",
                table: "Biometrics",
                newName: "IX_Biometrics_KidId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Biometrics",
                table: "Biometrics",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Biometrics_Kid_KidId",
                table: "Biometrics",
                column: "KidId",
                principalTable: "Kid",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Biometrics_Kid_KidId",
                table: "Biometrics");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Biometrics",
                table: "Biometrics");

            migrationBuilder.RenameTable(
                name: "Biometrics",
                newName: "BiometricsEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Biometrics_KidId",
                table: "BiometricsEntity",
                newName: "IX_BiometricsEntity_KidId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BiometricsEntity",
                table: "BiometricsEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BiometricsEntity_Kid_KidId",
                table: "BiometricsEntity",
                column: "KidId",
                principalTable: "Kid",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
