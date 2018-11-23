(ns metabase.db.spec
  "Functions for creating JDBC DB specs for a given engine.
  Only databases that are supported as application DBs should have functions in this namespace;
  otherwise, similar functions are only needed by drivers, and belong in those namespaces."
  (:require [clojure.string :as str]
            [medley.core :as m]
            [ring.util.codec :as codec]))

(defn h2
  "Create a database specification for a h2 database. Opts should include a key
  for :db which is the path to the database file."
  [{:keys [db]
    :or   {db "h2.db"}
    :as   opts}]
  (merge {:classname   "org.h2.Driver"
          :subprotocol "h2"
          :subname     db}
         (dissoc opts :db)))

(defn- remove-required-keys [db-spec & more-keys]
  (apply dissoc db-spec (concat [:host :port :db :dbname :user :password :additional-options]
                                more-keys)))

(defn- purge-nil-values [m]
  (m/remove-kv (fn [k v] (or (nil? k) (nil? v))) m))

(defn- make-subname [host port db extra-connection-params]
  (let [query-params (codec/form-encode (purge-nil-values extra-connection-params))]
    (str "//" host ":" port "/" db (when-not (str/blank? query-params)
                                     (str "?" query-params)))))

(defn postgres
  "Create a database specification for a postgres database. Opts should include
  keys for :db, :user, and :password. You can also optionally set host and
  port."
  [{:keys [host port db]
    :or {host "localhost", port 5432, db ""}
    :as opts}]
  (if (get opts :sslcert)
    (merge {:classname "org.postgresql.Driver" ; must be in classpath
            :subprotocol "postgresql"
            :subname (str "//" host ":" port "/" db "?OpenSourceSubProtocolOverride=true&user=" (get opts :user) "&ssl=true&sslmode=verify-full&sslcert=" (get opts :sslcert) "&sslkey=" (get opts :sslkey) "&sslrootcert="(get opts :sslrootcert))
            :sslmode "verify-full"
            :ssl "true"}
           (dissoc opts :host :port :db)
           )
    (merge {:classname "org.postgresql.Driver" ; must be in classpath
            :subprotocol "postgresql"
            :subname (str "//" host ":" port "/" db "?OpenSourceSubProtocolOverride=true")}
           (dissoc opts :host :port :db)))

(defn crossdata
  "Create a database specification for a postgres database. Opts should include
  keys for :db, :user, and :password. You can also optionally set host and
  port."
  [{:keys [host port db user]
    :or {host "localhost", port 13422, db ""}
    :as opts}]


  (if db
    (merge {:classname "com.stratio.jdbc.core.jdbc4.StratioDriver" ; must be in classpath
            :subprotocol "crossdata"
            :subname (str "//Server=" host ":" port ";UID=" user ";SSL=true;LogLevel=3;LogPath=/tmp/crossdata-jdbc-logs")}
           (dissoc opts :host :port :db))
    (merge {:classname "com.stratio.jdbc.core.jdbc4.StratioDriver" ; must be in classpath
            :subprotocol "crossdata"
            :subname (str "//Server=" host ":" port ";UID=" user ";LogLevel=3;LogPath=/tmp/crossdata-jdbc-logs")}
           (dissoc opts :host :port :db))))

(defn crossdata2
  "Create a database specification for a postgres database. Opts should include
  keys for :db, :user, and :password. You can also optionally set host and
  port."
  [{:keys [host port db user]
    :or {host "localhost", port 13422, db ""}
    :as opts}]


  (if db
    (merge {:classname "com.stratio.jdbc.core.jdbc4.StratioDriver" ; must be in classpath
            :subprotocol "crossdata"
            :subname (str "//Server=" host ":" port ";UID=" user ";SSL=true;LogLevel=3;LogPath=/tmp/crossdata-jdbc-logs")}
           (dissoc opts :host :port :db))
    (merge {:classname "com.stratio.jdbc.core.jdbc4.StratioDriver" ; must be in classpath
            :subprotocol "crossdata"
            :subname (str "//Server=" host ":" port ";UID=" user ";LogLevel=3;LogPath=/tmp/crossdata-jdbc-logs")}
           (dissoc opts :host :port :db))))

(defn mysql
  "Create a database specification for a mysql database. Opts should include keys
  for :db, :user, and :password. You can also optionally set host and port.
  Delimiters are automatically set to \"`\"."
  [{:keys [host port db]
    :or   {host "localhost", port 3306, db ""}
    :as   opts}]
  (let [extra-connection-params (remove-required-keys opts)]
    (merge {:classname   "com.mysql.jdbc.Driver"
            :subprotocol "mysql"
            :subname     (make-subname host port db extra-connection-params)
            :delimiters  "`"}
           (dissoc opts :host :port :db))))


;; !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
;; !!                                                                                                               !!
;; !!   Don't put database spec functions for new drivers in this namespace. These ones are only here because they  !!
;; !!  can also be used for the application DB in metabase.driver. Put functions like these for new drivers in the  !!
;; !!                                            driver namespace itself.                                           !!
;; !!                                                                                                               !!
;; !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
