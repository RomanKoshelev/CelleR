// Celler (c) 2015 Krokodev
// Celler.App.Web
// SuitBody.cs

using Celler.App.Web.Game.Server.Entities.Enums;
using Celler.App.Web.Game.Server.Entities.Interfaces;
using Celler.App.Web.Game.Server.Entities.Structs;
using Celler.App.Web.Game.Server.Models;

namespace Celler.App.Web.Game.Server.Entities.Abstract
{
    public abstract class AbstractSuitObject<T>: AbstractEntity<T>, IBody, ISuit

    {

        #region ISuit

        public Suit Suit { get; set; }

        #endregion

        #region IBody

        public IBody Body
        {
            get { return this; }
        }

        string IBody.Id
        {
            get { return AsEntity.Id; }
        }
        public Point Position { get; set; }
        public double Size { get; set; }

        #endregion


        #region Protected

        protected SuitObjectModel ToSuitObjectModel()
        {
            return new SuitObjectModel {
                Id = AsEntity.Id,
                Suit = Suit.ToString(),
                Position = Body.Position.ToModel(),
                Size = Body.Size
            };
        }
        #endregion
    }
}