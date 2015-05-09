// Celler (c) 2015 Krokodev
// Celler.App.Web
// Sight.cs

using Celler.App.Web.Game.Server.Entities.Abstract;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.GameObjects
{
    public class Sight : AbstractSuitObject< SightModel >, ISight
    {
        #region ISight

        public ISight ISight
        {
            get { return this; }
        }

        string ISight.CellId { get; set; }

        #endregion


        #region Overrides

        public override SightModel ToModel()
        {
            return new SightModel {
                CellId = ISight.CellId,
                Base = ToSuitObjectModel()
            };
        }

        #endregion
    }
}